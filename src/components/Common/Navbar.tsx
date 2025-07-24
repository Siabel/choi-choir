"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-primary text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Choi Choir
        </Link>
        <div className="space-x-4">
          <Link href="/login" className="hover:underline text-primary-light">
            로그인
          </Link>
          <Link href="/signup" className="hover:underline text-primary-light">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}