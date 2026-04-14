"use client"

import { useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "./ui/input"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get("search") || ""
  const inputRef = useRef<HTMLInputElement>(null)
  const [hasValue, setHasValue] = useState(Boolean(currentSearch))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = inputRef.current?.value || ""
    if (query.trim()) {
      router.push(`/blog?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push("/blog")
    }
  }

  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = ""
    setHasValue(false)
    router.push("/blog")
  }

  return (
    <form onSubmit={handleSearch} className="relative group w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          key={currentSearch}
          ref={inputRef}
          type="text"
          placeholder="Search posts..."
          defaultValue={currentSearch}
          onChange={(e) => setHasValue(Boolean(e.target.value))}
          className="pl-10 pr-10 h-11 rounded-xl border-primary/10 bg-primary/5 focus-visible:ring-primary/20 font-medium"
        />
        {hasValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-primary/10 text-muted-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <button type="submit" className="hidden">Search</button>
    </form>
  )
}
