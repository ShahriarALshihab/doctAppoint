"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    router.push("/");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "All Appointments" },
    { href: "/dashboard/my-bookings", label: "Dashboard" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
              🩺
            </div>
            <span className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Doc<span className="text-blue-600">Appoint</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.displayName?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {user.displayName || "User"}
                  </span>
                  <span className={`text-slate-400 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>▾</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[999] animate-fade-in">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-sm font-bold text-slate-800 truncate">{user.displayName}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard/my-bookings" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      📅 My Bookings
                    </Link>
                    <Link href="/dashboard/my-profile" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      👤 My Profile
                    </Link>
                    <div className="border-t border-slate-50 mt-1 pt-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2">
                  Login
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-5">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-50" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 mb-1 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 mb-1 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-1 animate-fade-in">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-blue-50 rounded-xl">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 flex-shrink-0">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                      {user.displayName?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{user.displayName}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium text-sm">
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 px-4 flex flex-col gap-2">
              {user ? (
                <button onClick={handleLogout} className="text-left py-2 text-red-500 font-semibold text-sm">
                  🚪 Logout
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="py-2 text-slate-700 font-medium text-sm">Login</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm text-center py-2">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}