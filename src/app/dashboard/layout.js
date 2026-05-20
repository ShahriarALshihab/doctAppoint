"use client";

import PrivateRoute from "@/components/ui/PrivateRoute";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/my-bookings", label: "📅 My Bookings", icon: "📅" },
    { href: "/dashboard/my-profile", label: "👤 My Profile", icon: "👤" },
  ];

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-50">
        
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Dashboard
            </h1>
            <p className="text-blue-100 mt-1 text-sm">Manage your appointments and profile</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
           
            <aside className="md:w-56 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 sticky top-24">
                <nav className="space-y-1">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        pathname === link.href
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
