"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, X } from "lucide-react";

const links = [
  { href: "/dashboard", label: "لوحة التحكم", icon: "fa-house" },
  { href: "/dashboard/calendar", label: "التقويم", icon: "fa-calendar-days" },
  { href: "/dashboard/patients", label: "المرضى", icon: "fa-people-group" },
  { href: "/dashboard/settings", label: "الإعدادات", icon: "fa-gear" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* زر موبايل (Dashboard ↔ X) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-3 shadow rounded-lg border transition"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="w-6 h-6 text-gray-700 transition-transform duration-300 rotate-90" />
        ) : (
          <LayoutDashboard className="w-6 h-6 text-gray-700 transition-transform duration-300" />
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 w-64 h-screen bg-white shadow-xl border-l border-gray-200
          p-5 flex flex-col justify-between z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Profile */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="/n.jpg" alt="doctor" className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="font-bold text-gray-800">د. أحمد نائل</div>
              <div className="text-sm text-gray-500">اخصائي علاج نفسي</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${
                    active
                      ? "bg-teal-100 text-teal-600 font-semibold border-r-4 border-teal-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <i className={`fa-solid ${l.icon} text-lg`} />
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-lg"></i>
          تسجيل الخروج
        </button>
      </aside>
    </>
  );
}
