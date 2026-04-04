import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex h-16 items-center justify-between mx-auto px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-primary-foreground font-black text-xl">G</span>
            </div>
            <span className="font-bold text-xl tracking-tighter group-hover:text-primary transition-colors">
              Gill&apos;s Log
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <Link
              href="/"
              className="transition-colors hover:text-primary text-foreground/60"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-primary text-foreground/60"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-primary text-foreground/60"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
