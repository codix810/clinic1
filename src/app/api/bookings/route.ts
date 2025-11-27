import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking"; // ← لاحظ: Booking الرئيسي
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { success: false, message: "Expected form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const consultType = String(formData.get("consultType") || "");
    const place = String(formData.get("place") || "");
    const branch = String(formData.get("branch") || "");
    const date = String(formData.get("date") || "");
    const time = String(formData.get("time") || "");
    const notes = String(formData.get("notes") || "");
    const feeRaw = formData.get("fee");
    const file = formData.get("file") as File | null;

    if (!name || !phone || !consultType || !place || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    let transferImageUrl: string | undefined;

    if (file && file.size > 0) {
      const buf = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "bookings" },
            (err, result) => {
              if (err || !result) return reject(err);
              resolve(result as any);
            }
          ).end(buf);
        }
      );

      transferImageUrl = uploadResult.secure_url;
    }

    const fee =
      typeof feeRaw === "string" && feeRaw.trim() !== ""
        ? Number(feeRaw)
        : undefined;

    // لو عندك دكتور واحد ثابت
    const doctorId = "66f123abc9ff3c28b652de01"; // ← حط ID الدكتور هنا

    const booking = await Booking.create({
      doctor: doctorId,
      name,
      phone,
      type: consultType, // ← خلي نوع الاستشارة يروح للداشبورد
      place,
      branch,
      date,
      time,
      notes,
      fee,
      transferImageUrl,
      status: "pending", // ← دي المهم
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (err: any) {
    console.error("BOOKING ERROR:", err?.message);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: err?.message,
      },
      { status: 500 }
    );
  }
}
