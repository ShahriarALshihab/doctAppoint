"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DoctorCard({ doctor }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleViewDetails = () => {
    if (!user) {
      toast.error("Please login to view doctor details.");
      router.push(`/login?redirect=/doctors/${doctor.id}`);
      return;
    }
    router.push(`/doctors/${doctor.id}`);
  };

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 right-3 badge-specialty">{doctor.specialty}</span>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-amber-500 text-sm">★</span>
          <span className="text-xs font-bold text-slate-800">{doctor.rating}</span>
          <span className="text-xs text-slate-500">({doctor.reviews})</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {doctor.name}
        </h3>
        <p className="text-sm text-slate-500 mb-1">🏥 {doctor.hospital}</p>
        <p className="text-sm text-slate-500 mb-3">📍 {doctor.location}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400">Experience</p>
            <p className="text-sm font-semibold text-slate-700">{doctor.experience}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Fee</p>
            <p className="text-sm font-bold text-blue-600">৳{doctor.fee}</p>
          </div>
        </div>

        <button onClick={handleViewDetails} className="btn-primary w-full text-sm py-2.5">
          View Details
        </button>
      </div>
    </div>
  );
}