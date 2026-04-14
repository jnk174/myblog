"use client"

import { useCallback, useEffect, useState, FormEvent } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, signInWithSocial, signOut } from "@/lib/supabase"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOut, Send, Globe } from "lucide-react"

type Message = {
  id: string
  user_name: string
  user_avatar: string
  content: string
  created_at: string
  user_id: string
}

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-4 w-4" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function GuestBook() {
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)

    if (!error) {
      setMessages(data || [])
    }
  }, [])

  useEffect(() => {
    let ignore = false

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (ignore) return
      setUser(session?.user || null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (ignore) return
        if (!error) {
          setMessages(data || [])
        }
      })

    return () => {
      ignore = true
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !newMessage.trim()) return

    const { error } = await supabase.from("guestbook").insert({
      user_id: user.id,
      user_name: user.user_metadata.full_name || user.email,
      user_avatar: user.user_metadata.avatar_url,
      content: newMessage,
    })

    if (error) {
      alert("메시지 작성 중 오류가 발생했습니다: " + error.message)
    } else {
      setNewMessage("")
      fetchMessages()
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">📮 방명록</h2>
        <p className="text-sm text-muted-foreground">
          소셜 로그인 후 쪽지를 남겨주세요. 짧은 한 마디도 큰 힘이 됩니다!
        </p>
      </div>

      {!user ? (
        <div className="rounded-xl border bg-card p-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground font-medium">로그인하고 메시지를 남겨보세요</p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => signInWithSocial('github')}
              className="gap-2"
            >
              <GitHubIcon /> GitHub
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signInWithSocial('google')}
              className="gap-2"
            >
              <Globe className="h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signInWithSocial('kakao')}
              className="gap-2 bg-[#FEE500] text-[#3c1e1e] border-none hover:bg-[#FEE500]/80"
            >
              K 카카오
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>{user.user_metadata.full_name?.[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold">{user.user_metadata.full_name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-xs text-muted-foreground">
              <LogOut className="mr-1 h-3 w-3" /> 로그아웃
            </Button>
          </div>
          <div className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="짧은 인사, 응원, 질문 아무거나 좋아요 :)"
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" size="sm" className="rounded-lg px-4">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 items-start rounded-lg border bg-card/50 p-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={msg.user_avatar} />
                <AvatarFallback>{msg.user_name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold truncate">{msg.user_name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 mt-1">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
