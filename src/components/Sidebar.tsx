"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Tag, Folder, Hash } from "lucide-react"
import SearchBar from "./SearchBar"

type SidebarItem = {
  name: string
  count: number
}

type SidebarProps = {
  categories: SidebarItem[]
  tags: SidebarItem[]
  totalPosts?: number
}

export default function Sidebar({ categories, tags, totalPosts }: SidebarProps) {
  const searchParams = useSearchParams()
  const activeSearch = searchParams.get("search") || ""

  return (
    <aside className="space-y-12">
      {/* 1. Search Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
          <Hash className="h-4 w-4" />
          <span>Quick Search</span>
        </div>
        <SearchBar />
      </section>

      {/* 2. Categories Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
          <Folder className="h-4 w-4" />
          <span>Categories</span>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href="/blog"
            className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              !activeSearch ? "bg-primary text-white shadow-lg shadow-primary/25" : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>All Posts</span>
              {totalPosts !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${!activeSearch ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                  {totalPosts}
                </span>
              )}
            </div>
            <span className="text-[10px] opacity-50 font-black">ALL</span>
          </Link>
          {categories.map((cat) => {
            const categoryColors: Record<string, { dot: string; active: string; count: string }> = {
              투자: {
                dot: "bg-sky-500",
                active: "bg-sky-600 text-white shadow-lg shadow-sky-600/20",
                count: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
              },
              독서: {
                dot: "bg-amber-500",
                active: "bg-amber-600 text-white shadow-lg shadow-amber-600/20",
                count: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
              },
              교육: {
                dot: "bg-emerald-500",
                active: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20",
                count: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
              },
              코딩: {
                dot: "bg-violet-500",
                active: "bg-violet-600 text-white shadow-lg shadow-violet-600/20",
                count: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
              },
              자동화: {
                dot: "bg-teal-500",
                active: "bg-teal-600 text-white shadow-lg shadow-teal-600/20",
                count: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
              },
              Default: {
                dot: "bg-slate-400",
                active: "bg-slate-700 text-white shadow-lg shadow-slate-700/20",
                count: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200",
              },
            };
            const color = categoryColors[cat.name as keyof typeof categoryColors] || categoryColors.Default;
            const isActive = activeSearch.toLowerCase() === cat.name.toLowerCase();
            
            return (
              <Link
                key={cat.name}
                href={`/blog?search=${encodeURIComponent(cat.name)}`}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? color.active
                    : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : color.dot}`} />
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : color.count}`}>
                    {cat.count}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 3. Tags Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
          <Tag className="h-4 w-4" />
          <span>Tag Cloud</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/blog?search=${encodeURIComponent(tag.name)}`}
              className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all border flex items-center gap-1.5 ${
                activeSearch.toLowerCase() === tag.name.toLowerCase()
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/25"
                  : "border-primary/10 text-muted-foreground hover:border-primary/40 hover:text-primary bg-primary/5"
              }`}
            >
              <span>#{tag.name}</span>
              <span className={`text-[9px] opacity-60 font-bold ${activeSearch.toLowerCase() === tag.name.toLowerCase() ? "text-white" : "text-primary"}`}>
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

    </aside>
  )
}
