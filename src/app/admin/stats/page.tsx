"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, MousePointer2, Share2, ShieldCheck, Loader2 } from "lucide-react"
import Link from "next/link"
import { fetchSearchKeywords, KeywordData } from "./actions"

type SiteStat = {
  date: string
  pv: number
  uv: number
}

type SiteReferrer = {
  source: string
  count: number
}

type PostStat = {
  slug: string
  title: string
  views: number
}

type ChartData = {
  name: string
  value: number
}

export default function AdminStatsPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState<SiteStat[]>([])
  const [referrerData, setReferrerData] = useState<ChartData[]>([])
  const [topPostsData, setTopPostsData] = useState<ChartData[]>([])
  const [keywordsData, setKeywordsData] = useState<KeywordData[]>([])
  const [isGscLinked, setIsGscLinked] = useState(false)
  const [summary, setSummary] = useState({
    totalPv: 0,
    totalUv: 0,
    avgPv: 0,
  })

  useEffect(() => {
    const checkAdmin = () => {
      const isBlogAdmin = localStorage.getItem("is_blog_admin") === "true"
      if (!isBlogAdmin) {
        router.push("/")
      } else {
        setIsAdmin(true)
        fetchData()
      }
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        // 1. Fetch site_stats (last 30 days)
        const { data: stats } = await supabase
          .from("site_stats")
          .select("*")
          .order("date", { ascending: true })
        
        if (stats) {
          const typedStats = stats as SiteStat[]
          setStatsData(typedStats)
          const totalPv = typedStats.reduce((acc, curr) => acc + curr.pv, 0)
          const totalUv = typedStats.reduce((acc, curr) => acc + curr.uv, 0)
          setSummary({
            totalPv,
            totalUv,
            avgPv: Math.round(totalPv / Math.max(typedStats.length, 1))
          })
        }

        // 2. Fetch site_referrers
        const { data: refs } = await supabase
          .from("site_referrers")
          .select("*")
          .order("count", { ascending: false })
        
        if (refs) {
          const grouped = (refs as SiteReferrer[]).reduce<Record<string, number>>((acc, curr) => {
            if (!acc[curr.source]) acc[curr.source] = 0
            acc[curr.source] += curr.count
            return acc
          }, {})
          
          const formattedRefs = Object.entries(grouped).map(([name, value]) => ({
            name,
            value
          }))
          setReferrerData(formattedRefs)
        }

        // 3. Fetch post_stats
        const { data: posts } = await supabase
          .from("post_stats")
          .select("slug, title, views")
        
        if (posts) {
          const aggregated = (posts as PostStat[]).reduce<Record<string, { title: string; views: number }>>((acc, curr) => {
            if (!acc[curr.slug]) acc[curr.slug] = { title: curr.title, views: 0 }
            acc[curr.slug].views += curr.views
            return acc
          }, {})

          const formattedPosts = Object.entries(aggregated)
            .map(([slug, data]) => ({
              name: data.title || slug,
              value: data.views
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8) 

          setTopPostsData(formattedPosts)
        }

        // 4. Fetch Search Console Keywords
        const keywordsResponse = await fetchSearchKeywords()
        setKeywordsData(keywordsResponse.data)
        setIsGscLinked(keywordsResponse.isLinked)

      } catch (error) {
        console.error("Error fetching admin stats:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAdmin) return null

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"]

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <header className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-4 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            블로그로 돌아가기
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-1">
                Dashboard
              </h1>
              <div className="text-sm font-medium text-muted-foreground tracking-wide uppercase opacity-70">Custom Blog Analytics System</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status</div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Connected
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("is_blog_admin")
              router.push("/")
            }}
            className="px-6 py-2.5 bg-destructive/10 text-destructive text-xs font-black uppercase tracking-widest rounded-xl hover:bg-destructive hover:text-white transition-all duration-300 border border-destructive/20"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <Card className="border-0 bg-slate-50 dark:bg-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Users className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">누적 방문자 수 (UV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">{summary.totalUv.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-widest">Total Unique Visitors</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-slate-50 dark:bg-white/5 relative overflow-hidden group text-primary">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <MousePointer2 className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">누적 페이지 뷰 (PV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">{summary.totalPv.toLocaleString()}</div>
            <div className="text-[10px] opacity-70 mt-1 font-bold uppercase tracking-widest">Total Page Views</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-slate-50 dark:bg-white/5 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Share2 className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">일평균 조회수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black tracking-tighter">{summary.avgPv.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-widest">Daily Average Views</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 mb-8 lg:grid-cols-3">
        {/* Visitors Trend Chart */}
        <Card className="lg:col-span-2 rounded-[2rem] border-0 bg-white dark:bg-slate-900 shadow-xl shadow-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Visitors Trend</CardTitle>
              <h3 className="text-2xl font-black tracking-tight">트래픽 추이 (30일)</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase">
                <span className="h-2 w-2 rounded-full bg-primary" /> PV
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> UV
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                <XAxis 
                  dataKey="date" 
                  fontSize={10} 
                  fontWeight={700}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => val.split("-").slice(1).join("/")}
                  dy={10}
                />
                <YAxis fontSize={10} fontWeight={700} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", border: "none", borderRadius: "16px", color: "#fff", padding: "12px" }}
                  itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "900", textTransform: "uppercase" }}
                  labelStyle={{ marginBottom: "4px", fontSize: "10px", opacity: 0.5 }}
                />
                <Line
                  type="monotone"
                  dataKey="pv"
                  name="Page Views"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  name="Visitors"
                  stroke="#10b981"
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Posts Chart */}
        <Card className="rounded-[2rem] border-0 bg-white dark:bg-slate-900 shadow-xl shadow-primary/5">
          <CardHeader className="pb-8">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Top Performance</CardTitle>
            <h3 className="text-2xl font-black tracking-tight">가장 많이 읽은 글</h3>
          </CardHeader>
          <CardContent className="h-[400px]">
            {topPostsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPostsData} layout="vertical" margin={{ left: -30, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    fontSize={10} 
                    fontWeight={700}
                    width={100} 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => val.length > 15 ? val.substring(0, 15) + '...' : val}
                  />
                  <Tooltip 
                    cursor={{ fill: "rgba(0,0,0,0.03)" }}
                    contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", border: "none", borderRadius: "16px", color: "#fff" }}
                  />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                    {topPostsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-white/5 rounded-3xl">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">데이터 수집 중...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 mb-8 lg:grid-cols-2">
        {/* Keywords Table */}
        <Card className="rounded-[2rem] border-0 bg-white dark:bg-slate-900 shadow-xl shadow-primary/5 overflow-hidden">
          <CardHeader className="pb-6">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Search Keywords</CardTitle>
            <h3 className="text-2xl font-black tracking-tight">구글 검색 유입 키워드</h3>
          </CardHeader>
          <CardContent>
            {isGscLinked ? (
              keywordsData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-primary/5">
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Keyword Query</th>
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Clicks</th>
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Imps</th>
                        <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">CTR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                      {keywordsData.map((kw, i) => (
                        <tr key={i} className="hover:bg-primary/5 transition-colors group">
                          <td className="py-4 px-2">
                            <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {kw.keys?.[0] || "-"}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center text-sm font-black">{kw.clicks?.toLocaleString()}</td>
                          <td className="py-4 px-2 text-center text-sm font-medium text-muted-foreground">{kw.impressions?.toLocaleString()}</td>
                          <td className="py-4 px-2 text-center text-sm font-bold text-emerald-500">
                            {((kw.ctr || 0) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-emerald-500/20">
                  <ShieldCheck className="h-10 w-10 text-emerald-500/50 mb-4" />
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 text-center mb-2">연동 완료! (조회 대기)</p>
                  <p className="text-xs text-muted-foreground/60 text-center max-w-[250px] leading-relaxed">
                    구글 서치 콘솔 연동이 성공적으로 완료되었습니다. 아직 집계된 검색 유입 키워드가 없습니다.
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-primary/10">
                <ShieldCheck className="h-10 w-10 text-muted-foreground/30 mb-4" />
                <p className="text-sm font-bold text-muted-foreground text-center mb-2">Google Search Console API 미연동</p>
                <p className="text-xs text-muted-foreground/60 text-center max-w-[250px] leading-relaxed">
                  키워드 데이터를 표시하려면 서비스 계정 설정과 API 키 등록 및 권한 부여가 필요합니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Traffic Source Chart */}
        <Card className="rounded-[2rem] border-0 bg-white dark:bg-slate-900 shadow-xl shadow-primary/5">
          <CardHeader className="pb-8">
            <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-1">Traffic Channels</CardTitle>
            <h3 className="text-2xl font-black tracking-tight">유입 경로 분석</h3>
          </CardHeader>
          <CardContent className="h-[300px]">
            {referrerData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={referrerData}>
                  <XAxis 
                    dataKey="name" 
                    fontSize={10} 
                    fontWeight={900} 
                    axisLine={false} 
                    tickLine={false} 
                    textAnchor="middle"
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                    {referrerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                  <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "12px", border: "none", fontWeight: 900 }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm font-bold uppercase tracking-widest italic opacity-50">
                유입 경로 없음
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        {/* Admin Instructions Section */}
        <section className="bg-primary/5 rounded-[2rem] p-10 border-2 border-dashed border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-40 w-40 bg-primary/5 rounded-full blur-3xl" />
          
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-primary" /> 
            Admin Protocol
          </h2>
          
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Information
            </div>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground">
              현재 브라우저는 <strong>관리자 모드</strong>로 인증되었습니다. 
              본인의 활동은 통계 데이터(PV/UV)에서 자동으로 제외되어 순수 방문자 데이터만 수집됩니다.
            </p>
          </div>


          <div className="mt-8 pt-8 border-t border-primary/10">
            <p className="text-xs font-bold text-muted-foreground/80 leading-relaxed italic">
              "정밀 분석 데이터는 1분 단위로 갱신됩니다. 유입 통계가 예상과 다를 경우 
              Google Search Console의 인덱싱 상태를 함께 점검해 보세요."
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
