import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  summary: string;
  count: number;
  price: number;
}

const BookSchema: Schema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: { type: String, required: true },
  summary: { type: String, required: true },
  count: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
});

export default mongoose.model<IBook>("Book", BookSchema);
