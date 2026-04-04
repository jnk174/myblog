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
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/blog?search=${encodeURIComponent(cat.name)}`}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                activeSearch.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSearch.toLowerCase() === cat.name.toLowerCase() ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
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
