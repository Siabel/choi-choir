"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    label: "합창단 소개",
    dropdown: [
      { href: "/about", label: "소개 페이지" },
      { href: "/about/director", label: "단장 소개" },
      { href: "/about/members", label: "단원 소개" },
    ],
  },
  {
    label: "공연 일정",
    dropdown: [
      { href: "/schedules/upcoming", label: "예정 공연" },
      { href: "/schedules/past", label: "지난 공연" },
    ],
  },
  {
    label: "앨범",
    dropdown: [
      { href: "/albums/photos", label: "사진첩" },
      { href: "/albums/videos", label: "영상 모음" },
    ],
  },
  {
    label: "커뮤니티",
    dropdown: [
      { href: "/boards/notice", label: "공지사항" },
      { href: "/boards/free", label: "자유게시판" },
    ],
  },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <header className="bg-primary text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:text-primary-light transition-colors"
        >
          Choi Choir
        </Link>

        <nav className="flex space-x-6 relative">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() => toggleMenu(item.label)}
                className="hover:text-primary-light transition-colors"
              >
                {item.label}
              </button>
              {openMenu === item.label && (
                <div className="absolute top-full mt-2 bg-white text-primary rounded shadow-md py-2 w-48 z-50">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-4 py-2 hover:bg-primary-light hover:text-white transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="space-x-4">
          <Link href="/login" className="hover:text-primary-light transition-colors">
            로그인
          </Link>
          <Link href="/signup" className="hover:text-primary-light transition-colors">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}