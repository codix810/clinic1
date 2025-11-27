// models/Patient.ts
import { Schema, model, models, Document } from "mongoose";

export interface IPatient extends Document {
  doctor: string;        // doctorId as plain string
  fullName: string;
  phone: string;
  gender?: "ذكر" | "أنثى";
  dob?: Date;
  address?: string;
  notes?: string;
  createdAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
    doctor: { type: String, required: true },         // STRING مش ObjectId
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String },
    dob: { type: Date },
    address: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default models.Patient || model<IPatient>("Patient", patientSchema);
