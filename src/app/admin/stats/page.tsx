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

type SiteStat = {
  date: string
  pv: number
  uv: number
}

type SiteReferrer = {
  source: string
  count: number
}

type ReferrerChartData = {
  name: string
  value: number
}

export default function AdminStatsPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState<SiteStat[]>([])
  const [referrerData, setReferrerData] = useState<ReferrerChartData[]>([])
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
          // Group by source
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

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
            Admin Stats Dashboard
            <ShieldCheck className="h-8 w-8 text-primary" />
          </h1>
          <div className="text-sm text-muted-foreground">개인 투자 저널 블로그의 정밀 유입 분석 데이터</div>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem("is_blog_admin")
            router.push("/")
          }}
          className="text-xs font-black uppercase tracking-widest text-destructive hover:underline"
        >
          Logout Admin Mode
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card className="border-2 border-primary/10 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" /> Total Visitors (UV)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{summary.totalUv.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-primary/10 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <MousePointer2 className="h-4 w-4" /> Total Page Views (PV)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{summary.totalPv.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-primary/10 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Avg. Daily Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{summary.avgPv.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Visitors Trend Chart */}
        <Card className="rounded-3xl overflow-hidden border-2 border-primary/5">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-[0.2em]">Visitors Trend (PV vs UV)</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  fontSize={10} 
                  tickFormatter={(val) => val.split("-").slice(1).join("/")}
                />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "12px", color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="pv"
                  name="Page Views"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="uv"
                  name="Visitors"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#10b981" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Source Chart */}
        <Card className="rounded-3xl overflow-hidden border-2 border-primary/5">
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-[0.2em]">Top Referrer Sources</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            {referrerData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={referrerData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.1} />
                  <XAxis type="number" fontSize={10} hide />
                  <YAxis dataKey="name" type="category" fontSize={10} width={80} />
                  <Tooltip 
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "12px", color: "#fff" }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {referrerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm font-medium italic">
                No external referrers recorded yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <section className="mt-16 bg-secondary/50 rounded-3xl p-8 border-2 border-dashed border-primary/10">
        <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" /> Admin Instructions
        </h2>
        <ul className="space-y-4 text-sm text-muted-foreground font-medium">
          <li className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-black text-primary">1</span>
            현재 브라우저는 <strong>관리자 모드</strong>가 활성화되어 있습니다. 본인이 블로그를 돌아다녀도 로그 수집에서 제외됩니다.
          </li>
          <li className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-black text-primary">2</span>
            유입 키워드를 확인하려면 <strong>Google Search Console</strong> 및 <strong>Naver Search Advisor</strong> 연동이 필요합니다. 연동 준비가 되시면 말씀해 주세요.
          </li>
          <li className="flex gap-3 items-start">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-black text-primary mt-0.5">3</span>
            <div className="break-all leading-relaxed">
              보안상 이 페이지(/admin/stats)는 이 브라우저에서만 접속 가능합니다. 만약 다른 기기에서 접속하려면 URL 뒤에 <code className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-bold">?admin_secret=ska48*!qmf</code>를 붙여 한 번 방문해야 합니다.
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}
