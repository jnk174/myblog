import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-3xl">
      <div className="space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Me
          </h1>
          <p className="text-lg text-muted-foreground">
            배우고, 기록하고, 성장하는 것을 좋아하는 사람입니다.
          </p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
          <p>
            안녕하세요. 이 블로그를 운영하고 있는 Gill입니다.
          </p>

          <p>
            저는 전문가가 아닙니다. 깊은 통찰이 있는 것도 아니고, 
            특정 분야에서 오래 일한 경력이 있는 것도 아닙니다. 
            다만 <strong>새로운 것을 배우는 과정 자체를 즐기는 사람</strong>입니다.
          </p>

          <p>
            나이가 들수록 배움에서 멀어지는 게 자연스럽다고들 하지만, 
            저는 좀 다른 것 같습니다. 몇 살이 되든 처음 접하는 분야 앞에서 
            느끼는 설렘은 여전히 똑같거든요. 잘 모르는 것 투성이지만, 
            어제보다 조금이라도 더 알게 된 오늘이 좋습니다.
          </p>

          <p>
            이 블로그는 그런 저의 <strong>성장 일지</strong>입니다. 
            비전문 분야를 하나씩 배워가며 남기는 기록이고, 
            때로는 삽질의 흔적이며, 때로는 작은 성취의 축하입니다. 
            완벽하지 않아도 괜찮다고 생각합니다.
            배우고 있다는 것 자체가 충분하니까요.
          </p>

          <p>
            혹시 비슷한 마음으로 무언가를 시작하려는 분이 계시다면, 
            이 공간이 작은 용기가 되었으면 좋겠습니다.
          </p>
        </div>

        <div className="pt-8 border-t flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            블로그 둘러보기
          </Link>
          <a
            href="https://github.com/jnk17"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
