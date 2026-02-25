"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/search", label: "검색", icon: Search },
    { href: "/favorites", label: "찜", icon: Heart },
    { href: "/profile", label: "마이", icon: User },
  ];

  return (
    <div className="btm-nav btm-nav-md border-t border-base-300 lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={isActive ? "active text-primary" : ""}
          >
            <Icon size={24} />
            <span className="btm-nav-label text-xs">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
