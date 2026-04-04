import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-card py-12 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter">Gill&apos;s Log</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A premium technical space for sharing engineering insights and daily growth.
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
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium underline underline-offset-4">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium underline underline-offset-4">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium underline underline-offset-4">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-muted-foreground">
            © {new Date().getFullYear()} Gill&apos;s Log. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/50">Bold Tech Engine v1.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
