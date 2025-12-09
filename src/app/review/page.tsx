'use client';

import { SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
import { FaStar } from "react-icons/fa";

// استيراد المكون بدون SSR
const Rating = dynamic(
  () => import('@smastrom/react-rating').then((mod) => mod.Rating),
  { ssr: false }
);

import '@smastrom/react-rating/style.css';



export default function PatientReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "أحمد العتيبي",
      text: "مرحلة علاجي النفسي كانت سلسة وسهلة بفضل متابعته المستمرة.",
      rating: 5,
    },
    {
      id: 2,
      name: "فاطمة الدوسري",
      text: "أفضل طبيب نفسي في مصر، تعامل راقٍ ونتائج ممتازة.",
      rating: 5,
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(2.5);

  const handleAddReview = () => {
    if (!newName.trim() || !newText.trim()) return;
    setReviews([
      ...reviews,
      {
        id: Date.now(),
        name: newName.trim(),
        text: newText.trim(),
        rating: newRating,
      },
    ]);
    setNewName("");
    setNewText("");
    setNewRating(5);
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        آراء المرضى
      </h2>

      {/* Inputs فوق */}
        <div className="flex flex-col gap-4 mb-6">
            <input
                type="text"
                placeholder="اسم المريض"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            />

            <textarea
                placeholder="تفاصيل الكشف / رأيك"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition h-24"
            />

            {/* Rating مع تنسيق أفضل */}
            <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 whitespace-nowrap">تقييم:</span>
              <Rating
                style={{ maxWidth: 200 }}
                value={newRating}
                onChange={(rate: SetStateAction<number>) => setNewRating(rate)}
              />

            </div>

            <button
                onClick={handleAddReview}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition w-full"
            >
                أضف رأيك
            </button>
        </div>


      {/* عرض الآراء */}
      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-100 p-6 rounded-xl shadow-md border-r-4 border-teal-600"
          >
            {/* النجوم */}
            <div className="flex gap-1 mb-3 text-xl text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>

            <p className="text-gray-700 leading-7 mb-2">{review.text}</p>
            <p className="text-teal-600 font-bold text-sm">— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
