import Link from "next/link";

type Category = {
  name: string;
  count: number;
};

type ProfileMiniProps = {
  categories: Category[];
};

const categoryStyles: Record<string, { label: string; dot: string; badge: string }> = {
  Investment: {
    label: "자산 투자",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-800 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:ring-sky-800/60",
  },
  "Book Review": {
    label: "읽고 남은 생각",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-800/60",
  },
  Education: {
    label: "아이의 공부 기록",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800/60",
  },
  "Coding & Automation": {
    label: "코딩과 자동화",
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-800 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-200 dark:ring-violet-800/60",
  },
};

export default function ProfileMini({ categories }: ProfileMiniProps) {
  return (
    <section className="py-20 border-t bg-card/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted border-4 border-background shadow-lg overflow-hidden flex items-center justify-center">
              <span className="text-5xl">🔭</span>
            </div>
          </div>
          
          <div className="space-y-6 text-center md:text-left flex-1">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">안녕하세요, Gill입니다.</h2>
              <p className="text-muted-foreground leading-relaxed">
                투자와 공부, 책과 코딩 사이에서 배운 것들을 기록합니다. <br className="hidden md:block" />
                잘 아는 사람의 결론보다, 배워가는 사람의 과정을 남기고 싶습니다.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {categories.map((category) => {
                const style = categoryStyles[category.name] || {
                  label: category.name,
                  dot: "bg-slate-400",
                  badge: "bg-slate-50 text-slate-700 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700",
                };

                return (
                  <Link
                    key={category.name}
                    href={`/blog?search=${encodeURIComponent(category.name)}`}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition-colors hover:opacity-80 ${style.badge}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                    {style.label}
                    <span className="text-xs opacity-60">{category.count}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4">
              <Link href="/about" className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                 주인장 소개 더 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
