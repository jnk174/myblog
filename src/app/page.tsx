import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { format } from "date-fns";

export default function Home() {
  const latestPosts = getSortedPostsData().slice(0, 3); // 최근 3개 포스트

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
      <section className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Welcome to the Tech Blog
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A beautiful static blog built with Next.js, explicitly designed using generic and flexible components from Shadcn UI.
          </p>
        </div>
        <div className="space-x-4">
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Read the Blog
          </Link>
          <Link
            href="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            About Me
          </Link>
        </div>
      </section>

      <section className="mt-16 md:mt-24 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link key={post.slug.join("/")} href={`/blog/${post.slug.join("/")}`}>
              <div className="flex flex-col space-y-2 rounded-lg border bg-card p-4 hover:shadow-md transition-shadow h-full">
                <span className="text-sm text-muted-foreground">
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </span>
                <h3 className="text-xl font-bold">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-auto pt-4 flex gap-2 flex-wrap">
                  {post.tags?.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
