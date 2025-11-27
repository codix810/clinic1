import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await dbConnect();

    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

    const mapped = bookings.map(b => ({
      ...b,
      consultationType: b.type,  // تغيير الاسم عشان الفرنت
      number: 1,                 // ثابت مؤقتًا
    }));

    return NextResponse.json({
      success: true,
      bookings: mapped,
    });
  } catch (err) {
    console.error("GET /api/booking error:", err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
