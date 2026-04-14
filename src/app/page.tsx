import Link from "next/link";
import { getAllCategories, getSortedPostsData } from "@/lib/posts";
import VisitorCounter from "@/components/VisitorCounter";
import GuestBook from "@/components/GuestBook";
import PostCard from "@/components/PostCard";

// New Home Components
import HeroSection from "@/components/home/HeroSection";
import FeaturedPost from "@/components/home/FeaturedPost";
import StartHere from "@/components/home/StartHere";
import TopicGateway from "@/components/home/TopicGateway";
import ProfileMini from "@/components/home/ProfileMini";

export default function Home() {
  const allPosts = getSortedPostsData();
  const categories = getAllCategories();

  // Manual Curation: Slugs are defined in lib/posts.ts (date prefixes removed)
  const featuredPost = allPosts.find(p => p.slug.join("/") === "2026-04/stolen-focus-review") || allPosts[0];
  
  const startHereSlugs = [
    "2026-04/tdf-deep-dive",
    "2026-04/stolen-focus-review",
    "2026-04/son-math-mock-exam"
  ];
  const startHerePosts = allPosts.filter(p => startHereSlugs.includes(p.slug.join("/")));
  
  const latestPosts = allPosts.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Identity & Hero */}
      <HeroSection />

      {/* 2. Featured Post */}
      <FeaturedPost post={featuredPost} />

      {/* 3. Start Here (Curated) */}
      {startHerePosts.length > 0 && <StartHere posts={startHerePosts} />}

      {/* 4. Topic Gateway */}
      <TopicGateway />

      {/* 5. Latest Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Recent Archive</h2>
            <Link href="/blog" className="text-sm font-medium hover:underline">
              모든 글 보기 ({allPosts.length})
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.slug.join("/")} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Human Touch & Footer Area */}
      <ProfileMini categories={categories} />
      
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <GuestBook />
          <div className="mt-12 pt-8 border-t text-center">
            <VisitorCounter />
          </div>
        </div>
      </section>
    </div>
  );
}
