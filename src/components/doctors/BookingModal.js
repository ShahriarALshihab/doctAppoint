"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export default function BookingModal({ doctor, onClose }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientName: user?.displayName || "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: doctor.availability[0] || "",
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bookingData = {
        userEmail: user.email,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image,
        hospital: doctor.hospital,
        fee: doctor.fee,
        ...form,
      };
      await axiosInstance.post("/bookings", bookingData);
      toast.success("Appointment booked successfully! 🎉");
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to book appointment. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2
              className="text-xl font-bold text-slate-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Book Appointment
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">with {doctor.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Doctor Info Summary */}
        <div className="mx-6 mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-semibold text-slate-800">{doctor.name}</p>
              <p className="text-slate-500">
                {doctor.specialty} • {doctor.hospital}
              </p>
            </div>
            <p className="font-bold text-blue-600 text-lg">৳{doctor.fee}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Read-only fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Your Email
              </label>
              <input
                value={user?.email || ""}
                readOnly
                className="input-field bg-slate-50 cursor-not-allowed text-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Doctor Name
              </label>
              <input
                value={doctor.name}
                readOnly
                className="input-field bg-slate-50 cursor-not-allowed text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Patient Name *
            </label>
            <input
              name="patientName"
              required
              placeholder="Your full name"
              value={form.patientName}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Gender *
              </label>
              <select
                name="gender"
                required
                value={form.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Phone *
              </label>
              <input
                name="phone"
                required
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Appointment Date *
              </label>
              <input
                name="appointmentDate"
                required
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={form.appointmentDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Time Slot *
              </label>
              <select
                name="appointmentTime"
                required
                value={form.appointmentTime}
                onChange={handleChange}
                className="input-field"
              >
                {doctor.availability.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex-1 py-3 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 py-3 text-sm disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Booking...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
