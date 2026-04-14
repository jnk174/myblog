import Link from "next/link";

export default function ProfileMini() {
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
              <h2 className="text-2xl font-bold">기록하는 사람, Gill</h2>
              <p className="text-muted-foreground leading-relaxed">
                금융 투자(TDF, ETF), 자녀 교육의 여정, 그리고 삶의 기록과 배움을 <br className="hidden md:block" />
                데이터와 정직한 말로 아카이빙합니다. 시행착오를 숨기지 않고 <br className="hidden md:block" />
                그 과정에서 얻은 인사이트를 나누는 것을 즐깁니다.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Investment
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Education
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Life & Growth
              </div>
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
