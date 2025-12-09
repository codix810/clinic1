"use client";

import { useState } from "react";

export default function AddPatient() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("يجب تسجيل الدخول");

    const res = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("تم إضافة المريض بنجاح");
      window.location.href = "/dashboard/patients";
    } else {
      alert("حدث خطأ — راجع الكونسل");
      console.log(data);
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-4xl mx-auto">
     <h1 className="text-3xl font-bold mb-8 text-center  text-gray-800">
  إضافة مريض جديد
</h1>


      <form
        className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
        onSubmit={handleSubmit}
      >
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            placeholder="اسم المريض"
            className="border p-3 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            placeholder="رقم الهاتف"
            className="border p-3 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="date"
            className="border p-3 rounded-xl w-full shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />

          <select
            className="border p-3 rounded-xl w-full shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">اختر النوع</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>

          <input
            placeholder="العنوان"
            className="border p-3 rounded-xl w-full shadow-sm md:col-span-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <textarea
          placeholder="ملاحظات"
          className="border p-3 rounded-xl w-full h-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition cursor-pointer "
        >
          إضافة المريض
        </button>
      </form>
    </div>
  );
}
