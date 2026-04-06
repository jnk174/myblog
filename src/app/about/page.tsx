import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
      <div className="space-y-16">
        {/* Header Section */}
        <header className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            The <span className="text-primary italic">Boundless</span> Explorer
          </h1>
          <p className="text-xl md:text-3xl font-medium text-muted-foreground leading-relaxed max-w-3xl">
            하나의 틀에 갇히지 않고, 세상의 모든 낯선 지식을 탐험하고 
            연결하는 것을 즐기는 학습자입니다.
          </p>
        </header>

        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Mission Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight inline-block border-b-8 border-primary/20 pb-2">
                Across the Boundaries
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                세상에는 아직 제가 모르는 것들이 가득하며, 그 영역들이 서로 어떻게 얽혀 있는지 파헤치는 과정은 언제나 설레는 일입니다. 특정 분야의 전문가라는 이름표보다는, **'끊임없이 배우는 사람'**으로 기억되고 싶습니다.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight">The Joy of Learning</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                전문가들의 어려운 언어를 나만의 쉽고 직관적인 언어로 정제하는 과정, 그리고 서로 다른 두 지점이 만나 새로운 통찰을 주는 순간을 가장 좋아합니다. 배움에는 경계도, 끝도 없다고 믿습니다.
              </p>
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="bg-primary/5 border-l-8 border-primary rounded-r-3xl p-10 space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">Philosophies</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-black text-primary uppercase text-sm tracking-widest mb-1">Stay Curious</h4>
                <p className="font-bold text-lg">당연하게 여기는 것들에게 "왜?"라고 묻는 것에서 탐험은 시작됩니다.</p>
              </div>
              <div>
                <h4 className="font-black text-primary uppercase text-sm tracking-widest mb-1">Bridge the Unknown</h4>
                <p className="font-bold text-lg">흩어진 지식들을 연결하여 나만의 지도로 만들어 나갑니다.</p>
              </div>
              <div>
                <h4 className="font-black text-primary uppercase text-sm tracking-widest mb-1">Share the Insights</h4>
                <p className="font-bold text-lg">혼자만 알고 있는 지식보다, 나누었을 때 그 가치는 배가 된다고 믿습니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Section */}
        <section className="pt-16 border-t flex flex-col items-center text-center space-y-10">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">"Discovery starts where knowing ends."</h3>
            <p className="text-muted-foreground text-lg">
              이 공간은 제가 마주한 수많은 낯선 것들을 이해해가는 과정의 기록입니다.
              단순한 정보 전달을 넘어, 배움 그 자체의 즐거움을 함께 나누는 공간이 되기를 바랍니다.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/blog" 
              className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              Explore My Journey
            </Link>
            <a 
              href="https://github.com/jnk17" 
              target="_blank" 
              rel="noreferrer"
              className="px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Connect via GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
