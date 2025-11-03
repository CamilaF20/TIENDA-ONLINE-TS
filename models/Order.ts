import mongoose, { Schema, Document } from "mongoose";

interface IOrderProduct {
  name?: string; // optional when created from view
  product?: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  client: mongoose.Schema.Types.ObjectId;
  products: IOrderProduct[];
  total: number;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      name: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IOrder>("Order", OrderSchema);
