import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <header className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            The Non-Expert <span className="text-primary">Expert</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl">
            지식은 0이지만 호기심은 무한대. 
            전문가가 되기보다 배움을 즐기는 탐험가의 기록입니다.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Concept Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight inline-block border-b-4 border-primary pb-2">
              Concept: 비전문전문가
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-lg">
              <p>
                웹 기술? 리액트? 넥스트? 사실 제 머릿속 지식은 **0**에 수렴합니다. 
                하지만 그게 제 강점입니다. 아무것도 모르기에 모든 것이 새롭고, 
                그 배움의 과정을 기록하는 것 자체를 가장 좋아하니까요.
              </p>
              <p>
                저는 이미 알고 있는 것을 말하는 전문가가 아닙니다. 
                전혀 모르는 분야(비전문분야)를 파헤치고, 이해하고, 나만의 방식으로 
                다시 풀어내는 과정을 즐기는 **'배움의 전문가'**가 되고 싶습니다.
              </p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="bg-secondary/50 rounded-3xl p-8 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">Philosophy</h2>
            <ul className="space-y-4 font-bold text-muted-foreground">
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl">01</span>
                <span>모른다는 것을 인정하는 용기에서 배움이 시작됩니다.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl">02</span>
                <span>전문가들의 언어를 비전문가의 언어로 번역하는 것을 즐깁니다.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-2xl">03</span>
                <span>정답을 찾는 것보다 질문을 던지는 과정이 더 중요합니다.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Closing Section */}
        <section className="pt-12 border-t space-y-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold mb-4 italic">"Knowing is boring. Discovering is everything."</h3>
            <p className="text-muted-foreground mb-8">
              이 블로그는 제가 모르는 것들을 하나씩 정복(또는 삽질)해 나가는 과정의 아카이브입니다.
              함께 배우고, 함께 질문하며 성장을 즐길 분들을 환영합니다.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/blog" 
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Explore Blog
              </Link>
              <a 
                href="https://github.com/jnk17" 
                target="_blank" 
                rel="noreferrer"
                className="border-2 border-primary text-primary px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
