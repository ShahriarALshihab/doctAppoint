"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UpdateProfileModal from "@/components/dashboard/UpdateProfileModal";
import Image from "next/image";

export default function MyProfilePage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (!user) return null;

  return (
    <div>
      <h2
        className="text-2xl font-bold text-slate-900 mb-6"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        My Profile
      </h2>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-blue-600 to-teal-500 relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user.displayName?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="flex-1 sm:mb-2">
              <h3
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {user.displayName || "User"}
              </h3>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary text-sm py-2 px-5 self-start sm:self-auto sm:mb-2"
            >
              ✏️ Update Profile
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "👤",
                label: "Full Name",
                value: user.displayName || "Not set",
              },
              { icon: "✉️", label: "Email Address", value: user.email },
              {
                icon: "✅",
                label: "Email Verified",
                value: user.emailVerified ? "Verified ✅" : "Not Verified",
              },
              {
                icon: "🔐",
                label: "Auth Provider",
                value:
                  user.providerData?.[0]?.providerId === "google.com"
                    ? "Google"
                    : "Email/Password",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  {icon} {label}
                </p>
                <p className="font-semibold text-slate-800 break-all text-sm">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <UpdateProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
