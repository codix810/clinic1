"use client";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto p-4">

      {/* Hero Section */}
      <main className="flex mt-16 items-center justify-between gap-20 max-md:flex-col">

        <img
          src="/n.jpg"
          className="rounded-3xl w-[450px] shadow-lg max-md:w-full"
        />

        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-snug">
            مركز الاخصائي <span className="text-teal-600">احمد نائل</span>
          </h1>

          <p className="text-teal-600 text-xl mt-2 mb-4 font-medium">
            اخصائي علاج نفسي وتأهيل الإدمان والاستشارات
          </p>

          <p className="text-gray-600 leading-7 mb-6 text-lg">
            مرحبًا بك في مركزنا حيث نسعى لتوفير رعاية نفسية متكاملة،  
            ونضمن لك بيئة آمنة وسرية تساعدك على التحسن والتعافي.
          </p>

          <ul className="space-y-3 text-gray-700 text-lg">
            <li className="flex items-center gap-3 text-green-600">
              <i className="fa-regular fa-circle-check text-xl" />
              خبرة كبيرة في العلاج النفسي
            </li>
            <li className="flex items-center gap-3 text-green-600">
              <i className="fa-regular fa-circle-check text-xl" />
              استشارات نفسية أونلاين وحضورية
            </li>
            <li className="flex items-center gap-3 text-green-600">
              <i className="fa-regular fa-circle-check text-xl" />
              بيئة نفسية شاملة وآمنة وسرية
            </li>
          </ul>

          <a
            href="/booking"
            className="inline-block mt-8 bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow hover:bg-teal-700 transition"
          >
            احجز الآن
          </a>
        </div>
      </main>

      {/* Branches */}
      <section className="text-center mt-24">
        <h1 className="text-3xl font-bold text-gray-800">فروعنا</h1>
        <p className="text-gray-500 mt-3 text-lg">
          اختر الفرع الأقرب لك للحصول على الرعاية التي تستحقها
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Branch 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">فرع الإسكندرية</h3>

          <div className="space-y-4 text-gray-600 text-lg">
            <p className="flex gap-3">
              <i className="fa-solid fa-calendar text-teal-600 text-xl" />
              أيام العمل : الاثنين والثلاثاء
            </p>
            <p className="flex gap-3">
              <i className="fa-regular fa-clock text-teal-600 text-xl" />
              ساعات العمل : من 12 م إلى 9 م
            </p>
            <p className="flex gap-3">
              <i className="fa-solid fa-location-dot text-teal-600 text-xl" />
              62 ش خليل حمادة / أمام صيدلية فرحات / عيادات الماسة التخصصية
            </p>
            <p className="flex gap-3 font-bold text-teal-600">
              <i className="fa-solid fa-mobile-screen text-xl" />
              01274394945
            </p>
          </div>
        </div>

        {/* Branch 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-gray-800 mb-4">فرع القاهرة</h3>

          <div className="space-y-4 text-gray-600 text-lg">
            <p className="flex gap-3">
              <i className="fa-solid fa-calendar text-teal-600 text-xl" />
              أيام العمل : السبت والاربعاء والخميس
            </p>
            <p className="flex gap-3">
              <i className="fa-regular fa-clock text-teal-600 text-xl" />
              ساعات العمل : من 12 م إلى 8 م
            </p>
            <p className="flex gap-3">
              <i className="fa-solid fa-location-dot text-teal-600 text-xl" />
              4 شارع عصمت منصور / الحي الثامن / مدينة نصر
            </p>
            <p className="flex gap-3 font-bold text-teal-600">
              <i className="fa-solid fa-mobile-screen text-xl" />
              01274394945
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="mt-24 text-center">
        <h1 className="text-3xl font-bold text-gray-800">خدماتنا</h1>
        <p className="text-gray-500 mt-3 text-lg">
          خدمات متخصصة لضمان أفضل رعاية نفسية لك ولأسرتك
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        
        {/* Service 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-lg transition cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600">
            <i className="fa-solid fa-brain" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">المتابعة والاستشارات</h3>
          <p className="text-gray-500 mt-3">
            متابعة دورية واستشارات متخصصة تضمن لك تحسن حالتك النفسية
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-lg transition cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600">
            <i className="fa-solid fa-person" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            الاختبارات والمقاييس النفسية
          </h3>
          <p className="text-gray-500 mt-3">
            تقييمات دقيقة لفهم حالتك النفسية بأدوات علمية موثوقة
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-lg transition cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600">
            <i className="fa-solid fa-heart-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">الفحص النفسي الشامل</h3>
          <p className="text-gray-500 mt-3">
            فحص شامل وتقييم متكامل باستخدام أحدث طرق التشخيص
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-28 bg-gradient-to-r from-teal-600 to-teal-800 text-white text-center p-14 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">لا تتردد في التواصل معنا</h2>

        <p className="max-w-xl mx-auto opacity-90 leading-7 mb-6 text-lg">
          فريق متخصص جاهز لدعمك وتقديم كل ما تحتاجه من استشارات وعلاج نفسي احترافي.
        </p>

        <a
          href="/booking"
          className="bg-white text-teal-700 px-10 py-4 rounded-full text-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          احجز الآن
        </a>
      </div>

    </div>
  );
}
