// app/api/patients/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";
import { getDoctorIdFromRequest } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = context.params;

  const patient = await Patient.findOne({ _id: id, doctor: doctorId });
  if (!patient)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );

  return NextResponse.json({ success: true, patient });
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = context.params;
  const body = await req.json();

  const patient = await Patient.findOneAndUpdate(
    { _id: id, doctor: doctorId },
    body,
    { new: true }
  );

  if (!patient)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );

  return NextResponse.json({ success: true, patient });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();
  const doctorId = getDoctorIdFromRequest(req);
  if (!doctorId) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = context.params;

  await Patient.findOneAndDelete({ _id: id, doctor: doctorId });

  return NextResponse.json({ success: true });
}
