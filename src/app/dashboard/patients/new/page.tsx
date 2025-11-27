"use client";

import { useState } from "react";

export default function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    notes: "",
  });

const handleSubmit = async (e: any) => {
  e.preventDefault();

  const res = await fetch("/api/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (data.success) {
    alert("تم تسجيل المريض");
  } else {
    alert("Error");
  }
};


  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">إضافة مريض جديد</h1>

      <input
        placeholder="اسم المريض"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="رقم الهاتف"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        type="date"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />

      <select
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option>ذكر</option>
        <option>أنثى</option>
      </select>

      <input
        placeholder="العنوان"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <textarea
        placeholder="ملاحظات"
        className="border p-3 rounded w-full"
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-teal-600 text-white px-6 py-3 rounded-lg"
      >
        إضافة المريض
      </button>
    </div>
  );
}
