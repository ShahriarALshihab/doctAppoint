"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export default function UpdateBookingModal({ booking, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientName: booking.patientName,
    gender: booking.gender,
    phone: booking.phone,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.patch(`/bookings/${booking._id}`, form);
      toast.success("Appointment updated successfully!");
      onUpdated(data.booking);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Update Appointment
          </h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Read-only fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your Email</label>
              <input value={booking.userEmail} readOnly className="input-field bg-slate-50 cursor-not-allowed text-slate-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Doctor</label>
              <input value={booking.doctorName} readOnly className="input-field bg-slate-50 cursor-not-allowed text-slate-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Patient Name *</label>
            <input name="patientName" required value={form.patientName} onChange={handleChange} className="input-field" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Gender *</label>
              <select name="gender" required value={form.gender} onChange={handleChange} className="input-field">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone *</label>
              <input name="phone" required type="tel" value={form.phone} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date *</label>
              <input name="appointmentDate" required type="date" value={form.appointmentDate} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Time *</label>
              <input name="appointmentTime" required value={form.appointmentTime} onChange={handleChange} className="input-field" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1 py-3 text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm disabled:opacity-60">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}