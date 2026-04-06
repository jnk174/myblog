import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-card py-12 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter">Gill&apos;s Log</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              배우고, 기록하고, 성장하는 것을 좋아하는 사람의 학습 일지입니다.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Links</h4>
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Connect</h4>
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a 
                href="mailto:jnk174@gmail.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                jnk174@gmail.com
              </a>
              <a 
                href="https://github.com/jnk17" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-muted-foreground">
            © {new Date().getFullYear()} Gill&apos;s Log. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
