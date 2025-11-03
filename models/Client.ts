import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  address?: string;
}

const clientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model<IClient>("Client", clientSchema);
