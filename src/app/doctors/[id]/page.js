"use client";

import { use, useState } from "react";
import { doctors } from "@/data/doctors";
import PrivateRoute from "@/components/ui/PrivateRoute";
import BookingModal from "@/components/doctors/BookingModal";
import Image from "next/image";
import Link from "next/link";

export default function DoctorDetailPage({ params }) {
  const { id } = use(params);
  const doctor = doctors.find((d) => d.id === id);
  const [showModal, setShowModal] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Doctor Not Found</h2>
          <Link href="/appointments" className="btn-primary mt-4 inline-flex">Back to Appointments</Link>
        </div>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/appointments" className="hover:text-blue-600 transition-colors">Appointments</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{doctor.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Image & Quick Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 sticky top-24">
                <div className="relative h-72">
                  <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <span className="badge-specialty mb-2 block w-fit">{doctor.specialty}</span>
                  <h1 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {doctor.name}
                  </h1>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-amber-500">★</span>
                    <span className="font-bold text-slate-800">{doctor.rating}</span>
                    <span className="text-slate-400 text-sm">({doctor.reviews} reviews)</span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600 mb-6">
                    <p className="flex items-center gap-2">🏥 {doctor.hospital}</p>
                    <p className="flex items-center gap-2">📍 {doctor.location}</p>
                    <p className="flex items-center gap-2">⏳ {doctor.experience} experience</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 mb-5 text-center">
                    <p className="text-xs text-slate-500 mb-1">Consultation Fee</p>
                    <p className="text-3xl font-bold text-blue-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      ৳{doctor.fee}
                    </p>
                  </div>

                  <button onClick={() => setShowModal(true)} className="btn-primary w-full py-3">
                    📅 Book Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>About Doctor</h2>
                <p className="text-slate-600 leading-relaxed">{doctor.description}</p>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Available Time Slots
                </h2>
                <div className="flex flex-wrap gap-3">
                  {doctor.availability.map((slot) => (
                    <span key={slot} className="flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-xl border border-blue-100">
                      🕐 {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialization */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Quick Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Specialty", value: doctor.specialty },
                    { label: "Experience", value: doctor.experience },
                    { label: "Hospital", value: doctor.hospital },
                    { label: "Location", value: doctor.location },
                    { label: "Rating", value: `${doctor.rating} / 5.0` },
                    { label: "Patient Reviews", value: `${doctor.reviews} reviews` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                      <p className="font-semibold text-slate-800 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setShowModal(true)} className="btn-primary w-full py-4 text-base">
                📅 Book Appointment Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <BookingModal doctor={doctor} onClose={() => setShowModal(false)} />}
    </PrivateRoute>
  );
}
