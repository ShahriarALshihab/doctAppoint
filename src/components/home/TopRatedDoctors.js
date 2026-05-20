import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/doctors/DoctorCard";
import Link from "next/link";

export default function TopRatedDoctors() {
  const topRated = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-3">
            ⭐ Top Rated
          </span>
          <h2 className="section-title mb-3">Our Best Doctors</h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            Meet our highest-rated specialists trusted by thousands of patients
            across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topRated.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/appointments" className="btn-outline">
            View All Appointments →
          </Link>
        </div>
      </div>
    </section>
  );
}
