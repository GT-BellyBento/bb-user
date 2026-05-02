'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size="header" />
          </Link>

          {/* CTA Button */}
          <button
            onClick={scrollToWaitlist}
            className="btn-primary text-sm sm:text-base"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
}
