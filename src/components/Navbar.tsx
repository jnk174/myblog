"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 관리자 권한 확인
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem("is_blog_admin") === "true";
      setIsAdmin(adminStatus);
    };

    checkAdmin();
    
    // 스토리지 변경 이벤트 리스너 (선택 사항 - 다른 탭에서의 변경 감지)
    window.addEventListener("storage", checkAdmin);
    return () => window.removeEventListener("storage", checkAdmin);
  }, []);

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
            <Link href="/" className="transition-colors hover:text-primary text-foreground/60">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary text-foreground/60">
              About
            </Link>
            <Link href="/blog" className="transition-colors hover:text-primary text-foreground/60">
              Blog
            </Link>
            {isAdmin && (
              <Link href="/admin/stats" className="transition-colors text-primary font-black animate-in fade-in slide-in-from-left-2 duration-500">
                Stats
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-bold uppercase tracking-widest py-2 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-bold uppercase tracking-widest py-2 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-bold uppercase tracking-widest py-2 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            {isAdmin && (
              <Link
                href="/admin/stats"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-black uppercase tracking-widest py-2 text-primary transition-colors"
              >
                Stats
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
