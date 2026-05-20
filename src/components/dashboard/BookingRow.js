"use client";

import Image from "next/image";

export default function BookingRow({ booking, onUpdate, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {booking.doctorImage && (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={booking.doctorImage}
              alt={booking.doctorName}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h3
                className="font-bold text-slate-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {booking.doctorName}
              </h3>
              <p className="text-sm text-blue-600 font-medium">
                {booking.doctorSpecialty}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                🏥 {booking.hospital}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-blue-600">৳{booking.fee}</p>
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${
                  booking.status === "confirmed"
                    ? "bg-green-50 text-green-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {booking.status || "Pending"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { label: "Patient", value: booking.patientName },
              { label: "Date", value: booking.appointmentDate },
              { label: "Time", value: booking.appointmentTime },
              { label: "Phone", value: booking.phone },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-700 truncate">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-slate-50">
        <button
          onClick={() => onUpdate(booking)}
          className="flex-1 sm:flex-none btn-outline text-sm py-2 px-5"
        >
          ✏️ Update
        </button>
        <button
          onClick={() => onDelete(booking._id)}
          className="flex-1 sm:flex-none btn-danger text-sm py-2 px-5"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
