"use client"

import { useEffect, useState, FormEvent } from "react"
import { supabase, signInWithSocial, signOut } from "@/lib/supabase"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOut, MessageSquare, Globe } from "lucide-react"

type Comment = {
  id: string
  user_name: string
  user_avatar: string
  content: string
  created_at: string
  user_id: string
}

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [user, setUser] = useState<any>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // 1. 현재 사용자 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    // 2. 댓글 불러오기
    fetchComments()

    return () => subscription.unsubscribe()
  }, [postSlug])

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching comments:", error.message)
    } else {
      setComments(data || [])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    const { error } = await supabase.from("comments").insert({
      post_slug: postSlug,
      user_id: user.id,
      user_name: user.user_metadata.full_name || user.email,
      user_avatar: user.user_metadata.avatar_url,
      content: newComment,
    })

    if (error) {
      alert("댓글 작성 중 오류가 발생했습니다: " + error.message)
    } else {
      setNewComment("")
      fetchComments()
    }
  }

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId)
    if (error) {
      alert("삭제 중 오류가 발생했습니다.")
    } else {
      fetchComments()
    }
  }

  const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="h-5 w-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )

  return (
    <div className="mt-16 space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-black uppercase tracking-tighter">Comments ({comments.length})</h2>
      </div>

      {!user ? (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Sign in to leave a comment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => signInWithSocial('github')} className="h-12 w-12 rounded-xl p-0 transition-all hover:bg-black hover:text-white">
              <GitHubIcon />
            </Button>
            <Button variant="outline" onClick={() => signInWithSocial('google')} className="h-12 w-12 rounded-xl p-0 transition-all hover:bg-red-50 hover:text-red-800">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={() => signInWithSocial('kakao')} className="h-12 w-12 rounded-xl bg-[#FEE500] text-[#3c1e1e] border-none font-black hover:bg-[#FEE500]/80">K</Button>
            <Button variant="outline" onClick={() => signInWithSocial('naver')} className="h-12 w-12 rounded-xl bg-[#03C75A] text-white border-none font-black hover:bg-[#03C75A]/80">N</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>{user.user_metadata.full_name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight">{user.user_metadata.full_name}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Authorized User</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-[10px] uppercase font-black tracking-widest text-destructive">
              <LogOut className="mr-2 h-3 w-3" /> Log Out
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full min-h-[120px] rounded-2xl border bg-card p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
            <div className="flex justify-end">
              <Button type="submit" className="rounded-full px-8 font-black uppercase tracking-widest">
                Post Comment
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6 pt-8">
        {comments.map((comment) => (
          <div key={comment.id} className="group relative flex gap-4">
            <Avatar className="h-10 w-10 shrink-0 border">
              <AvatarImage src={comment.user_avatar} />
              <AvatarFallback>{comment.user_name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight">{comment.user_name}</span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed font-medium">{comment.content}</p>
              {user?.id === comment.user_id && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="w-fit text-[10px] font-black uppercase tracking-widest text-destructive/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
