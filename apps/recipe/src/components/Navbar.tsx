"use client";

import Link from "next/link";
import { Menu, Search, User } from "lucide-react";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu size={20} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li><Link href="/">홈</Link></li>
                        <li><Link href="/search">레시피 검색</Link></li>
                        <li><Link href="/favorites">찜한 레시피</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl font-bold text-primary">
                    Recipe AI
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/">홈</Link></li>
                    <li><Link href="/search">레시피 검색</Link></li>
                    <li><Link href="/favorites">찜한 레시피</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <Search size={20} />
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <User size={20} />
                    </div>
                </button>
            </div>
        </div>
    );
}
