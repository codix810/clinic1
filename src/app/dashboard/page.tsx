"use client";

import { useEffect, useState } from "react";

type BookingStatus = "pending" | "confirmed" | "rejected";

interface Booking {
  _id: string;
  status: BookingStatus;
  consultationType: string;
  date: string;
  time: string;
  name: string;
  number: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pending: 0,
    completed: 0,
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ==========================
  // تحميل الحجوزات
  // ==========================
  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("برجاء تسجيل الدخول مرة أخرى (لا يوجد توكن).");
        return;
      }

      const res = await fetch("/api/booking", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error("LOAD BOOKINGS ERROR:", data);
        setError(data.message || "فشل في تحميل الحجوزات");
        return;
      }

      const list: Booking[] = data.bookings || [];
      setBookings(list);

      const today = new Date().toISOString().slice(0, 10);

      setStats({
        totalPatients: list.length,
        todayAppointments: list.filter((b) => b.date === today).length,
        pending: list.filter((b) => b.status === "pending").length,
        completed: list.filter((b) => b.status === "confirmed").length,
      });
    } catch (err) {
      console.error("Error loading bookings:", err);
      setError("خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // تغيير حالة الحجز
  // ==========================
  const toggleStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      setActionLoadingId(id);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("برجاء تسجيل الدخول مرة أخرى (لا يوجد توكن محفوظ).");
        return;
      }

      const res = await fetch("/api/booking/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, newStatus }),
      });

      const data = await res.json();
      console.log("TOGGLE RESPONSE:", data);

      if (!res.ok || !data.success) {
        console.error("TOGGLE ERROR:", data);
        alert(data.message || "فشل تغيير حالة الحجز");
        return;
      }

      // إعادة تحميل الحجوزات بعد التغيير
      await loadBookings();
    } catch (err) {
      console.error("toggle error:", err);
      alert("حدث خطأ أثناء تحديث حالة الحجز");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
        <p className="text-gray-500 mt-1">نظرة عامة على العيادة</p>
      </div>

      {/* حالة التحميل / الأخطاء */}
      {loading && (
        <p className="text-center text-sm text-gray-500">جارٍ تحميل الحجوزات...</p>
      )}
      {error && (
        <p className="text-center text-sm text-red-600 font-semibold">
          {error}
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold">{stats.totalPatients}</h3>
          <p className="text-gray-600 text-sm">عدد المرضى</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold">{stats.todayAppointments}</h3>
          <p className="text-gray-600 text-sm">جلسات اليوم</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold">{stats.pending}</h3>
          <p className="text-gray-600 text-sm">منتظرة</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold">{stats.completed}</h3>
          <p className="text-gray-600 text-sm">مكتملة</p>
        </div>
      </div>

      {/* Bookings */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">الحجوزات القادمة</h2>

        {bookings.length === 0 && !loading && (
          <p className="text-gray-500 text-sm text-center">
            لا يوجد حجوزات حالياً.
          </p>
        )}

        <div className="space-y-4">
          {bookings.map((s) => (
            <div
              key={s._id}
              className="p-4 rounded-xl border flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    s.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : s.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.status === "pending"
                    ? "منتظرة"
                    : s.status === "confirmed"
                    ? "مؤكدة"
                    : "مرفوضة"}
                </span>

                <div>
                  <h4 className="font-semibold">{s.consultationType}</h4>
                  <p className="text-gray-500 text-sm">
                    {s.date} - {s.time} - {s.name}
                  </p>
                </div>
              </div>

              {/* أزرار تغيير الحالة */}
              <div className="flex gap-2">
                {s.status === "pending" && (
                  <>
                    <button
                      disabled={actionLoadingId === s._id}
                      onClick={() => toggleStatus(s._id, "confirmed")}
                      className="px-3 py-1 bg-teal-600 text-white rounded-full text-sm disabled:opacity-60"
                    >
                      {actionLoadingId === s._id ? "..." : "تأكيد"}
                    </button>
                    <button
                      disabled={actionLoadingId === s._id}
                      onClick={() => toggleStatus(s._id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded-full text-sm disabled:opacity-60"
                    >
                      {actionLoadingId === s._id ? "..." : "رفض"}
                    </button>
                  </>
                )}

                {s.status === "confirmed" && (
                  <>
                    <button
                      disabled={actionLoadingId === s._id}
                      onClick={() => toggleStatus(s._id, "pending")}
                      className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm disabled:opacity-60"
                    >
                      {actionLoadingId === s._id ? "..." : "إرجاع لمنتظرة"}
                    </button>
                    <button
                      disabled={actionLoadingId === s._id}
                      onClick={() => toggleStatus(s._id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded-full text-sm disabled:opacity-60"
                    >
                      {actionLoadingId === s._id ? "..." : "رفض"}
                    </button>
                  </>
                )}

                {s.status === "rejected" && (
                  <>
                    <button
                      disabled={actionLoadingId === s._id}
                      onClick={() => toggleStatus(s._id, "confirmed")}
                      className="px-3 py-1 bg-green-600 text-white rounded-full text-sm disabled:opacity-60"
                    >
                      {actionLoadingId === s._id ? "..." : "تأكيد"}
                    </button>
                    <button
                      disabled={actionLoadingId === s._id}
                      onClick={() => toggleStatus(s._id, "pending")}
                      className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm disabled:opacity-60"
                    >
                      {actionLoadingId === s._id ? "..." : "إرجاع لمنتظرة"}
                    </button>
                  </>
                )}
              </div>

              <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-bold">
                {s.number || 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
