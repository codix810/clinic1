"use client";

import { useState } from "react";

// أيام الأسبوع
const dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// أوقات الفروع
const branchTimes: any = {
  cairo: [
    "09:00 ص - 10:00 ص",
    "10:00 ص - 11:00 ص",
    "11:00 ص - 12:00 م",
    "12:00 م - 01:00 م",
    "01:00 م - 02:00 م",
    "02:00 م - 03:00 م",
  ],
  alex: [
    "09:00 ص - 10:00 ص",
    "10:00 ص - 11:00 ص",
    "11:00 ص - 12:00 م",
    "01:00 م - 02:00 م",
    "02:00 م - 03:00 م",
  ],
};

const onlineTimes = [
  "09:00 ص - 10:00 ص",
  "10:00 ص - 11:00 ص",
  "11:00 ص - 12:00 م",
  "01:00 م - 02:00 م",
  "02:00 م - 03:00 م",
];

export default function Booking() {
  const [consultType, setConsultType] = useState("");
  const [place, setPlace] = useState("");
  const [branch, setBranch] = useState("cairo");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getDayObj = (day: number) => {
    const d = new Date(year, month, day);
    return {
      dayNumber: day,
      dayName: dayNames[d.getDay()],
      dateStr: d.toISOString().slice(0, 10),
      disabled: d < new Date(today.toDateString()) || d.getDay() === 5,
    };
  };

  const handleSubmit = async () => {
    if (!consultType) return alert("اختر نوع الاستشارة");
    if (!place) return alert("اختر مكان الاستشارة");
    if (!name.trim()) return alert("ادخل اسم المريض");
    if (!phone.trim()) return alert("ادخل رقم الهاتف");
    if (place === "online" && (!fee || Number(fee) <= 0))
      return alert("ادخل مبلغ الحجز");
    if (!selectedDate) return alert("اختر التاريخ");
    if (!selectedTime) return alert("اختر الوقت");

    try {
      const formData = new FormData();
      formData.append("consultType", consultType);
      formData.append("place", place);
      formData.append("branch", branch);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("date", selectedDate);
      formData.append("time", selectedTime);
      if (fee) formData.append("fee", fee);
      if (notes) formData.append("notes", notes);
      if (file) formData.append("file", file);

      const res = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) return alert(data.message || "حدث خطأ");

      alert("تم تسجيل الحجز بنجاح");

      // reset form
      setConsultType("");
      setPlace("");
      setBranch("cairo");
      setName("");
      setPhone("");
      setFee("");
      setNotes("");
      setFile(null);
      setPreview(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      console.error(err);
      alert("خطأ في السيرفر");
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto p-4">

      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">حجز موعد</h1>
        <p className="text-gray-500 mt-2">يرجى ملء البيانات التالية</p>
      </div>

      <div className="mt-10 space-y-6">

        {/* نوع الاستشارة */}
        <div>
          <label className="font-semibold text-gray-700">نوع الاستشارة *</label>
          <div className="relative w-full mt-2">
            <select
              value={consultType}
              onChange={(e) => setConsultType(e.target.value)}
              className="w-full p-3 rounded-4xl border  border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition pr-10 cursor-pointer"
            >
              <option value="" >اختر نوع الاستشارة</option>
              <option value="كشف" >كشف</option>
              <option value="متابعة" >متابعة</option>
              <option value="استشارة" >استشارة</option>
            </select>
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none">
              <i className="fa-solid fa-chevron-down"></i>
            </span>
          </div>
        </div>

        {/* مكان الاستشارة */}
        {consultType && (
          <div>
            <label className="font-semibold text-gray-700">مكان الاستشارة *</label>
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => setPlace("offline")}
                className={`flex-1 p-3 rounded-xl border text-gray-700 font-semibold transition ${
                  place === "offline"
                    ? "bg-teal-50 border-teal-600"
                    : "bg-white border-gray-300 hover:bg-teal-50"
                }`}
              >
                في العيادة
              </button>

              <button
                onClick={() => setPlace("online")}
                className={`flex-1 p-3 rounded-xl border text-gray-700 font-semibold transition ${
                  place === "online"
                    ? "bg-teal-50 border-teal-600"
                    : "bg-white border-gray-300 hover:bg-teal-50"
                }`}
              >
                أونلاين
              </button>
            </div>
          </div>
        )}

        {/* بيانات المريض */}
        {place && (
          <>
            <div>
              <label className="font-semibold text-gray-700">اسم المريض *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">رقم الهاتف *</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>
          </>
        )}

        {/* الفرع */}
       {place === "offline" && (
          <div>
            <label className="font-semibold text-gray-700">اختر الفرع *</label>
            <div className="relative w-full mt-2">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition pr-10 cursor-pointer"
              >
                <option value="cairo">فرع القاهرة</option>
                <option value="alex">فرع الإسكندرية</option>
              </select>
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
          </div>
        )}
        {/* مبلغ الحجز */}
        {place === "online" && (
          <div>
            <label className="font-semibold text-gray-700">مبلغ الحجز *</label>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>
        )}

        {/* ملاحظات */}
        {place && (
          <div>
            <label className="font-semibold text-gray-700">ملاحظات للطبيب</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>
        )}

        {/* رفع صورة الدفع */}
        {place === "online" && (
          <div>
            <label className="font-semibold text-gray-700">رفع سكرين شوت التحويل *</label>
            <div
              className="border-2 border-dashed p-10 rounded-xl mt-3 text-center cursor-pointer hover:bg-blue-50 transition"
              onClick={() => document.getElementById("fileUpload")?.click()}
            >
              <i className="fa-solid fa-arrow-up text-4xl text-teal-600"></i>
              <p className="text-gray-600 mt-2">اضغط لرفع ملف الدفع</p>

              {file && <p className="text-green-600 mt-3 font-semibold">{file.name}</p>}
              {preview && (
                <img src={preview} className="w-40 mx-auto mt-4 rounded-xl shadow" />
              )}

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e: any) => {
                  const f = e.target.files[0];
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }}
              />
            </div>
          </div>
        )}

        {/* Calendar */}
        {place && (
          <div>
            <label className="font-semibold text-gray-700">اختيار التاريخ *</label>
            <div className="bg-white p-4 rounded-xl border mt-3 shadow">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  onClick={() => setMonth(month === 0 ? 11 : month - 1)}
                >
                  <i className="fa-solid fa-chevron-right" />
                </button>

                <h3 className="font-bold text-lg text-gray-800">{year} / {month + 1}</h3>

                <button
                  className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  onClick={() => setMonth(month === 11 ? 0 : month + 1)}
                >
                  <i className="fa-solid fa-chevron-left" />
                </button>
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-3 text-center">
                {[...Array(daysInMonth)].map((_, i) => {
                  const d = getDayObj(i + 1);
                  return (
                    <div
                      key={i}
                      onClick={() => !d.disabled && setSelectedDate(d.dateStr)}
                      className={`p-3 rounded-xl cursor-pointer border transition ${
                        d.disabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : selectedDate === d.dateStr
                          ? "bg-teal-100 border-teal-600"
                          : "bg-white hover:bg-teal-50"
                      }`}
                    >
                      <div className="text-sm text-gray-500">{d.dayName}</div>
                      <div className="text-lg font-bold text-gray-800">{d.dayNumber}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Time Slots */}
        {selectedDate && (
          <div>
            <label className="font-semibold text-gray-700">اختيار الوقت *</label>
            <div className="mt-3 grid md:grid-cols-3 gap-4">
              {(place === "online" ? onlineTimes : branchTimes[branch]).map((time: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl border text-center transition ${
                    selectedTime === time
                      ? "border-teal-600 bg-teal-100"
                      : "border-gray-300 hover:bg-teal-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full p-4 bg-green-600 text-white font-bold rounded-xl mt-10 hover:bg-green-700 transition"
        >
          احجز الآن
        </button>

      </div>
    </div>
  );
}
