'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/matches', label: 'Match' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/groups', label: 'Grup' },
  { href: '/bracket', label: 'Bracket' },
  { href: '/road', label: 'Jalur' },
  { href: '/teams', label: 'Tim' },
  { href: '/compare', label: 'Banding' },
  { href: '/stats', label: 'Statistik' },
  { href: '/prediksi', label: 'Prediksi' },
];

export default function Navbar({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onSearchOpen?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSearchOpen]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.jpeg" alt="Piala Dunia 2026" width={44} height={29} priority
              className="h-8 w-auto rounded" />
            <span className="font-display font-bold text-lg leading-none tracking-tight">
              PIALA DUNIA <span className="text-accent">2026</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={`relative px-3.5 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive(l.href) ? 'text-text' : 'text-text-muted hover:text-text'
                }`}>
                {l.label}
                {isActive(l.href) && <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 accent-bar rounded-full" />}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 card card-hover rounded-md text-sm text-text-muted"
              aria-label="Cari tim">
              <span>{'\u{1F50D}'}</span>
              <span className="hidden sm:inline text-xs opacity-60">{'\u2318'}K</span>
            </button>

            <button onClick={toggleTheme}
              className="p-2 card card-hover rounded-md text-text-muted"
              aria-label="Ganti tema">
              {theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}'}
            </button>

            <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-text-muted hover:text-text" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-bg-elevated">
          <div className="px-4 py-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`block py-2.5 px-3 text-sm font-medium uppercase tracking-wide rounded ${
                  isActive(l.href) ? 'text-accent bg-surface' : 'text-text-muted hover:text-text'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
