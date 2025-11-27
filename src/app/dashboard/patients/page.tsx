// src/app/dashboard/patients/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Patient {
  _id: string;
  fullName: string;
  phone: string;
  createdAt: string;
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;


    if (!token) {
      console.log("No token found in localStorage");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/patients", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
        if (!res.ok) {
          const text = await res.text();
          console.log("API Error status:", res.status);
          console.log("API Error body:", text);
          setPatients([]);
          return;
        }

        const data = await res.json();
        console.log("API data:", data);

        if (data.success && Array.isArray(data.patients)) {
          setPatients(data.patients);
        } else {
          setPatients([]);
        }
      } catch (err) {
        console.log("Fetch Error:", err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">قائمة المرضى</h1>
        <p className="text-gray-500 mt-1">إدارة وبحث عن معلومات المرضى</p>
      </div>

      {/* Add Patient */}
      <div className="flex justify-end">
        <a
          href="/admin/patients/new"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          <i className="fa-regular fa-calendar-plus"></i>
          مريض جديد
        </a>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 pr-12 border rounded-xl bg-gray-50 focus:outline-none focus:border-teal-600"
        />
        <i className="fa-solid fa-magnifying-glass absolute right-4 top-4 text-gray-500 text-lg"></i>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto min-h-[300px]">
        {loading ? (
          <div className="text-center text-gray-500 p-10">جاري التحميل...</div>
        ) : (
          <table className="w-full min-w-[800px] text-center">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-4">اسم المريض</th>
                <th className="p-4">تاريخ التسجيل</th>
                <th className="p-4">رقم التواصل</th>
                <th className="p-4">إجراءات</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              )}

              {filtered.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-4 font-semibold">{p.fullName}</td>
                  <td className="p-4 text-gray-600">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("ar")
                      : "-"}
                  </td>
                  <td className="p-4">{p.phone}</td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>

                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition">
                        <i className="fa-regular fa-folder-open"></i>
                      </button>

                      <a
                        href={`/admin/patients/${p._id}`}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-100 text-gray-600 hover:text-teal-600 transition"
                      >
                        <i className="fa-regular fa-eye"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination مؤقت */}
      <div className="flex justify-between items-center mt-6 text-gray-600 text-sm">
        <div>
          عرض {filtered.length} من {patients.length} نتيجة
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg">التالي</button>
          <button className="px-4 py-2 border rounded-lg bg-teal-600 text-white">
            1
          </button>
        </div>
      </div>
    </div>
  );
}
