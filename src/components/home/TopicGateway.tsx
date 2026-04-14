import Link from "next/link";

const topics = [
  {
    title: "자산 투자",
    desc: "TDF, ETF, 자산배분을 공부하며 남긴 기록",
    href: "/blog?search=Investment",
    color: "bg-blue-600",
    icon: "📈"
  },
  {
    title: "아이의 공부 기록",
    desc: "집에서 함께 공부하며 알게 된 것들",
    href: "/blog?search=Education",
    color: "bg-emerald-600",
    icon: "🌱"
  },
  {
    title: "읽고 남은 생각",
    desc: "책을 읽고 오래 남은 문장과 질문들",
    href: "/blog?search=Review",
    color: "bg-amber-600",
    icon: "📚"
  },
  {
    title: "코딩과 자동화",
    desc: "직접 만들고 고치며 배운 개발 기록",
    href: "/blog?search=Automation",
    color: "bg-indigo-600",
    icon: "💻"
  }
];

export default function TopicGateway() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">주제별 입구</h2>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            전체 글 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <Link 
              key={topic.title} 
              href={topic.href}
              className="group relative block p-8 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${topic.color}`} />
              
              <div className="relative space-y-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300">{topic.icon}</span>
                <div>
                  <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {topic.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
