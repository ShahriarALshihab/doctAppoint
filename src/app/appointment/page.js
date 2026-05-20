"use client";

import { useState } from "react";
import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [specialty, setSpecialty] = useState("All");

  const specialties = ["All", ...new Set(doctors.map((d) => d.specialty))];

  let filtered = doctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === "All" || d.specialty === specialty;
    return matchSearch && matchSpecialty;
  });

  if (sortBy === "fee-asc")
    filtered = [...filtered].sort((a, b) => a.fee - b.fee);
  if (sortBy === "fee-desc")
    filtered = [...filtered].sort((a, b) => b.fee - a.fee);
  if (sortBy === "rating")
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sortBy === "experience")
    filtered = [...filtered].sort(
      (a, b) => parseInt(b.experience) - parseInt(a.experience),
    );

  return (
    <div className="min-h-screen bg-slate-50">
      
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            All Appointments
          </h1>
          <p className="text-blue-100 text-lg">
            Browse and book from our verified specialist doctors
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
           
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
           
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="input-field md:w-52"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field md:w-52"
            >
              <option value="default">Sort: Default</option>
              <option value="rating">Top Rated</option>
              <option value="fee-asc">Fee: Low to High</option>
              <option value="fee-desc">Fee: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>

       
        <p className="text-slate-500 text-sm mb-6">
          Showing{" "}
          <span className="font-semibold text-blue-600">{filtered.length}</span>{" "}
          doctors
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-slate-500 text-lg font-medium">
              No doctors found
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Try a different search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
