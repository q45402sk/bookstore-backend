import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  summary: string;
}

const BookSchema: Schema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: { type: String, required: true },
  summary: { type: String, required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
