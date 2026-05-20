import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-lg">
                🩺
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Doc<span className="text-blue-400">Appoint</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Bangladesh&apos;s trusted platform for booking doctor appointments online. Quality healthcare, made accessible.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm hover:scale-110 transition-transform font-bold">f</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xs hover:scale-110 transition-transform font-bold">in</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "All Appointments", href: "/appointments" },
                { label: "My Bookings", href: "/dashboard/my-bookings" },
                { label: "My Profile", href: "/dashboard/my-profile" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-blue-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2"><span>📍</span><span>Gulshan-1, Dhaka 1212, Bangladesh</span></li>
              <li className="flex items-center gap-2"><span>📞</span><span>+880 1700-000000</span></li>
              <li className="flex items-center gap-2"><span>✉️</span><span>support@docappoint.com.bd</span></li>
              <li className="flex items-center gap-2"><span>🕐</span><span>Sat–Thu, 9AM – 6PM</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} DocAppoint Bangladesh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}