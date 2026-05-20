"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import UpdateBookingModal from "@/components/dashboard/UpdateBookingModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/bookings?email=${user.email}`);
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Appointment deleted successfully!");
    } catch {
      toast.error("Failed to delete. Try again.");
    }
  };

  const handleUpdated = (updatedBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b)),
    );
  };

  if (loading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl font-bold text-slate-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            My Bookings
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {bookings.length} appointment{bookings.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-20 text-center">
          <p className="text-5xl mb-4">📅</p>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            You haven&apos;t booked any appointments yet.
          </p>
          <a href="/appointments" className="btn-primary inline-flex">
            Book an Appointment
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Doctor Image */}
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
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {booking.doctorName}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">
                        {booking.doctorSpecialty}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        🏥 {booking.hospital}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-blue-600">
                        ৳{booking.fee}
                      </p>
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
                  onClick={() => setSelectedBooking(booking)}
                  className="flex-1 sm:flex-none btn-outline text-sm py-2 px-5"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="flex-1 sm:flex-none btn-danger text-sm py-2 px-5"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <UpdateBookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
