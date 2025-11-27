// models/Booking.ts
import { Schema, models, model, Document } from "mongoose";

export interface IBooking extends Document {
  doctor: string;
  patient?: string; // ref Patient (اختياري لو من بره)
  name: string;
  phone: string;
  place: "online" | "offline";
  branch?: "cairo" | "alex" | "online";
  date: string; // "2025-01-01"
  time: string; // "09:00 ص"
  type: string; // متابعة / استشارة / فحص دوري
  notes?: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    place: { type: String, enum: ["online", "offline"], required: true },
    branch: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Booking || model<IBooking>("Booking", bookingSchema);
