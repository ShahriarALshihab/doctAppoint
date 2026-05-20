import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | DocAppoint",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🏥</div>
        <h1
          className="text-7xl font-bold text-blue-600 mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold text-slate-800 mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Page Not Found
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary py-3 px-8">
            🏠 Go Home
          </Link>
          <Link href="/appointments" className="btn-outline py-3 px-8">
            Browse Doctors
          </Link>
        </div>
      </div>
    </div>
  );
}
