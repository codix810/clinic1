"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Profile() {
  return (
    <div className=" mx-auto px-4 md:px-10 bg-gray-100 max-w-full overflow-x-hidden">

      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mt-6">
        <Link href="/"  className="text-teal-600 font-semibold hover:underline">
          الرئيسية
        </Link>{" "}
        / ملف الطبيب
      </div>

      {/* Doctor Card */}
      <main className="mt-8 grid gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex max-md:flex-col items-center justify-between gap-6 border border-gray-100">
          
          <div className="flex items-center  gap-6 flex-col md:flex-col">
            {/* Image */}
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden shadow-md border-4  border-teal-50 self-center md:self-start">
              <img src="/n.jpg" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold text-gray-800">د. احمد نائل</h3>
              <p className="text-gray-500 mt-1 text-sm">
                أخصائي علاج نفسي وتأهيل الإدمان والاستشارات النفسية
              </p>
            </div>
          </div>

          {/* Button */}
          <a
            href="/booking"
            className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-teal-700 transition"
          >
            احجز الآن
          </a>
        </div>

        {/* Info Cards */}
       <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* Contact */}
          <div className="bg-white p-6 rounded-3xl shadow-md border-r-8 border-teal-500/0 hover:border-teal-300 duration-500 hover:shadow-lg transition">
            <h4 className="text-xl font-extrabold text-center mb-6 text-gray-800">
              معلومات الاتصال
            </h4>

            <div className="space-y-6 text-gray-700">

              {/* Phone */}
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 text-2xl shadow-sm">
                  <i className="fa-solid fa-mobile-screen" />
                </span>
                <div>
                  <div className="font-bold text-lg text-gray-900">01274394945</div>
                  <div className="text-sm text-gray-500">رقم الهاتف</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 text-2xl shadow-sm">
                  <i className="fa-regular fa-envelope" />
                </span>
                <div>
                  <div className="font-bold text-lg text-gray-900">ahmednaiel23@gmail.com</div>
                  <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 text-2xl shadow-sm">
                  <i className="fa-solid fa-location-dot" />
                </span>
                <div>
                  <div className="font-bold text-lg text-gray-900">القاهرة – الإسكندرية</div>
                  <div className="text-sm text-gray-500">الفروع المتاحة</div>
                </div>
              </div>

            </div>
          </div>

          {/* Bio */}
          <div className="bg-white p-6 rounded-3xl shadow-md border-r-8 border-teal-500/0 hover:border-teal-300 duration-500 hover:shadow-lg transition">
            <h4 className="text-xl font-extrabold text-center mb-6 text-gray-800">
              السيرة الذاتية
            </h4>
            <p className="text-gray-600 leading-8 text-center text-lg">
              أخصائي علاج نفسي وتأهيل الإدمان بخبرة طويلة في دعم وتحسين الصحة النفسية،
              وتقديم الاستشارات المهنية للحالات المعقدة والمتقدمة، مع التركيز على تمكين الأفراد
              وتحقيق الاستقرار النفسي والسلوكي.
            </p>
          </div>

        </div>

      </main>

      {/* Why Choose */}
      <div className="bg-white p-6 rounded-xl shadow mt-8 border border-gray-100">
        <h4 className="text-center text-xl font-bold mb-6 text-gray-800">
          لماذا تختار د. احمد نائل؟
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <div className="text-4xl text-teal-600 mb-2">
              <i className="fa-solid fa-medal" />
            </div>
            <h5 className="font-bold mb-1 text-gray-800">خبرة كبيرة</h5>
            <p className="text-sm text-gray-600">سنوات طويلة في العلاج النفسي</p>
          </div>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <div className="text-4xl text-teal-600 mb-2">
              <i className="fa-solid fa-users" />
            </div>
            <h5 className="font-bold mb-1 text-gray-800">أكثر من 5000 مريض</h5>
            <p className="text-sm text-gray-600">تم علاجهم بنجاح</p>
          </div>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <div className="text-4xl text-teal-600 mb-2">
              <i className="fa-solid fa-award" />
            </div>
            <h5 className="font-bold mb-1 text-gray-800">شهادات تدريبية</h5>
            <p className="text-sm text-gray-600">
              برامج متقدمة في العلاج النفسي والإدمان
            </p>
          </div>

        </div>
      </div>

      {/* آراء المرضى */}
      <div className="mt-10 bg-white  p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">آراء المرضى</h2>

        <div className="flex flex-col gap-6">
          {/* opinion one */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md border-r-4 border-teal-600 ">
            {/* stars */}
            <div className="flex gap-1 mb-3 text-yellow-400 text-xl">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))} 
            </div>

            <p className="text-gray-700 leading-7 mb-2">
              مرحلة علاجي النفسي كانت سلسة وسهلة بفضل متابعته المستمرة.
            </p>

            <p className="text-teal-600 font-bold text-sm">— أحمد العتيبي</p>
          </div>

          {/* opinion two */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md border-r-4 border-teal-600 ">
            {/* stars */}
            <div className="flex gap-1 mb-3 text-yellow-400 text-xl">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="text-gray-700 leading-7 mb-2">
              أفضل طبيب نفسي في مصر، تعامل راقٍ ونتائج ممتازة.
            </p>

            <p className="text-teal-600 font-bold text-sm">— فاطمة الدوسري</p>
          </div>
        </div>
      </div>


      {/* Locations */}
      <div className="bg-white p-6 rounded-xl shadow mt-8 border border-gray-100">
        <h4 className="text-center text-2xl font-bold mb-6 text-gray-800">
          أماكن العمل
        </h4>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Cairo */}
          <div className="bg-white p-5 rounded-3xl shadow-md border-r-8 border-teal-500/0  hover:border-teal-500  duration-600  transition hover:shadow-lg">
              {/* الخريطة */}
              <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 flex items-center justify-center text-gray-600 font-semibold">
                خريطة مصغرة
              </div>

              {/* عنوان الفرع */}
              <div className="font-extrabold text-xl text-center mb-1 text-gray-900">
                فرع القاهرة
              </div>

              {/* العنوان */}
              <p className="text-gray-700 text-sm text-center flex items-center justify-center gap-1 mb-4">
                4 شارع عصمت منصور / الحي الثامن / مدينة نصر
                <FaLocationDot className="text-teal-600" />
              </p>

              {/* ساعات العمل */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <h4 className="font-bold text-gray-800 text-center text-lg mb-3">
                  ساعات العمل
                </h4>

                <ul className="space-y-2">
                  <li className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex justify-between items-center text-gray-800">
                    <span className="font-semibold">السبت:</span>
                    <span className="bg-teal-200 text-teal-900 font-bold px-2 py-1 rounded-xl">
                     8م-12م
                    </span>
                  </li>

                  <li className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex justify-between items-center text-gray-800">
                    <span className="font-semibold">الأربعاء:</span>
                    <span className="bg-teal-200 text-teal-900 font-bold px-2 py-1 rounded-xl">
                        8م-12م
                    </span>
                  </li>

                  <li className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex justify-between items-center text-gray-800">
                    <span className="font-semibold">الخميس:</span>
                    <span className="bg-teal-200 text-teal-900 font-bold px-2 py-1 rounded-xl">
                        8م-12م
                    </span>
                  </li>
                </ul>
              </div>
          </div>


          {/* Alexandria */}
          <div className="bg-white p-5 rounded-3xl shadow-md border-r-8 border-teal-500/0  hover:border-teal-500  duration-600  transition hover:shadow-lg">
            {/* الخريطة */}
            <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 flex items-center justify-center text-gray-600 font-semibold">
              خريطة مصغرة
            </div>

            {/* عنوان الفرع */}
            <div className="font-extrabold text-xl text-center mb-1 text-gray-900">
              فرع الإسكندرية
            </div>

            {/* العنوان */}
             <p className="text-gray-700 text-sm text-center flex items-center justify-center gap-1 mb-4">
                62 ش خليل حمادة / أمام صيدلية فرحات
                <FaLocationDot className="text-teal-600" />
              </p>
          

            {/* ساعات العمل */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h4 className="font-bold text-gray-800 text-center text-lg mb-3">
                ساعات العمل
              </h4>

              <ul className="space-y-2">
                <li className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex justify-between items-center text-gray-800">
                  <span className="font-semibold">الاثنين:</span>
                  <span className="bg-teal-200 text-teal-900 font-bold px-2 py-1 rounded-xl">
                      9م-12م
                  </span>
                </li>

                <li className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex justify-between items-center text-gray-800">
                  <span className="font-semibold">الثلاثاء:</span>
                  <span className="bg-teal-200 text-teal-900 font-bold px-2 py-1 rounded-xl">
                    9م-12م
                  </span>
                </li>
              </ul>
            </div>
          </div>


        </div>
      </div>


       {/* المواعيد القادمة المتاحة */}
        <div className="mt-10 p-10">
          <h4 className="text-center text-2xl font-extrabold mb-6 text-gray-800">
            المواعيد القادمة المتاحة
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* اليوم */}
            <div className="bg-white border-r-4 border-teal-500/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <span className="text-gray-700 font-bold text-lg">اليوم</span>
              <span className="text-teal-600 font-extrabold text-3xl">15</span>
              <span className="bg-teal-100 text-teal-800 px-3 py-1 mt-2 rounded-xl font-semibold">
                11:30
              </span>
            </div>

            {/* غدًا */}
            <div className="bg-white border-r-4 border-teal-500/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <span className="text-gray-700 font-bold text-lg">غدًا</span>
              <span className="text-teal-600 font-extrabold text-3xl">16</span>
              <span className="bg-teal-100 text-teal-800 px-3 py-1 mt-2 rounded-xl font-semibold">
                09:00
              </span>
            </div>

            {/* بعد غد */}
            <div className="bg-white border-r-4 border-teal-500/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <span className="text-gray-700 font-bold text-lg">بعد غد</span>
              <span className="text-teal-600 font-extrabold text-3xl">17</span>
              <span className="bg-teal-100 text-teal-800 px-3 py-1 mt-2 rounded-xl font-semibold">
                10:30
              </span>
            </div>

            {/* الاثنين */}
            <div className="bg-white border-r-4 border-teal-500/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <span className="text-gray-700 font-bold text-lg">الاثنين</span>
              <span className="text-teal-600 font-extrabold text-3xl">18</span>
              <span className="bg-teal-100 text-teal-800 px-3 py-1 mt-2 rounded-xl font-semibold">
                14:00
              </span>
            </div>
          </div>
        </div>

    </div>
  );
}
