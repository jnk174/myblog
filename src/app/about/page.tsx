import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
      <div className="space-y-16">
        {/* Header Section */}
        <header className="space-y-6 text-center lg:text-left">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Expert for the <br />
            <span className="text-primary italic">Non-Expert</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-muted-foreground leading-relaxed max-w-3xl">
            가장 낯선 지식을 가장 친숙한 언어로 번역하는,<br />
            <span className="text-foreground font-black">비전문가를 위한 기술적 동반자</span>입니다.
          </p>
        </header>

        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Concept Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight inline-block border-b-8 border-primary/20 pb-2">
                Identity: 비전문전문가
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                세상에는 수많은 전문가가 있지만, 그들의 언어는 때때로 우리에게 거대한 장벽이 되곤 합니다. 
                저는 그 장벽 앞에 서 있는 여러분과 같은 탐험가입니다. 
                모든 것이 낯선 지점에서 시작하여, 스스로 납득할 수 있을 때까지 파고드는 
                <strong className="text-foreground"> '끊임없이 배우는 사람'</strong>으로 살아가고 있습니다.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">Bridge the Gap</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                전문가의 깊이를 존중하되, 비전문가의 눈높이에서 본질을 꿰뚫어 보는 것을 목표로 합니다. 
                어려운 개념을 쉬운 비유로, 복잡한 기술을 명확한 구조로 다시 설명하는 것이 제가 가장 즐거워하는 일입니다. 
                이 블로그는 그 기록의 집합소입니다.
              </p>
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="bg-primary/5 border-l-8 border-primary rounded-r-3xl p-10 space-y-8 h-full shadow-2xl shadow-primary/5">
            <h2 className="text-3xl font-black uppercase tracking-tight">Core Values</h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-6 w-1 bg-primary"></div>
                  <h4 className="font-black text-primary uppercase text-sm tracking-widest">Simplification</h4>
                </div>
                <p className="font-bold text-lg leading-tight">복잡함은 게으름의 증거입니다. 본질만 남을 때까지 덜어냅니다.</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-6 w-1 bg-primary"></div>
                  <h4 className="font-black text-primary uppercase text-sm tracking-widest">Connection</h4>
                </div>
                <p className="font-bold text-lg leading-tight">서로 다른 영역의 지식들을 엮어 새로운 통찰의 지도를 그립니다.</p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-6 w-1 bg-primary"></div>
                  <h4 className="font-black text-primary uppercase text-sm tracking-widest">Accessibility</h4>
                </div>
                <p className="font-bold text-lg leading-tight">지식의 문턱을 낮춰, 누구나 배움의 즐거움을 누리게 합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Section */}
        <section className="pt-16 border-t flex flex-col items-center text-center space-y-10">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">"Translating the unknown for the curious."</h3>
            <p className="text-muted-foreground text-lg">
              우리는 모두 어떤 분야에서는 비전문가입니다. 
              그 낯섦이 두려움이 아닌 설렘이 되도록, 
              오늘도 저는 누군가를 위해 다시 배우고 다시 씁니다.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/blog" 
              className="bg-primary text-primary-foreground px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/30"
            >
              Explore the Archive
            </Link>
            <a 
              href="https://github.com/jnk17" 
              target="_blank" 
              rel="noreferrer"
              className="px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Contact Developer
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
