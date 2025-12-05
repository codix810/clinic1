"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Stethoscope, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/profile", label: "ملف الطبيب" },
    { href: "/booking", label: "حجز موعد" },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white p-4 border border-gray-200 rounded-xl flex items-center justify-between">
        
        {/* User Icon */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <i className="fa-regular fa-user text-gray-600" />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-lg font-medium transition
                  ${isActive ? "text-teal-600 font-semibold" : "text-gray-500 hover:text-teal-600"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side brand */}
        <div className="hidden md:flex items-center gap-2 font-bold text-teal-600">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <i className="fa-solid fa-file-shield" />
          </div>
          <span>نظام الحجز</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-teal-600 text-2xl cursor-pointer"
        >
          {open?  <X/>: <Stethoscope/> }
        </button>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-lg font-medium transition
                  ${isActive ? "text-teal-600 font-semibold" : "text-gray-600 hover:text-teal-600"}
                `}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 font-bold text-teal-600 mt-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <i className="fa-solid fa-file-shield" />
            </div>
            <span>نظام الحجز</span>
          </div>
        </div>
      )}
    </>
  );
}
