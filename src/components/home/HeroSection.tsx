import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden border-b bg-dot-pattern">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0.5))] -z-10" />
      
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground balance">
          배우고, 기록하고, <br className="hidden md:block" />
          <span className="text-muted-foreground italic font-serif">조금씩 나아지는 삶의 로그</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          개발, 투자, 교육, 독서에서 얻은 시행착오를 <br className="hidden md:block" />
          <span className="font-semibold text-foreground">Gill의 언어</span>로 차분하게 정리하여 남깁니다.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full bg-foreground text-background font-medium transition-all hover:opacity-90 hover:scale-105 shadow-sm"
          >
            최근 기록 읽기
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full border border-input bg-background font-medium transition-all hover:bg-accent hover:scale-105"
          >
            소개 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
