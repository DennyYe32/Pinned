import mongoose, { Schema, Document, Model } from "mongoose";

interface IPin extends Document {
  name: string;
  description: string;
  googleUrl: string;
  type: string;
  area: string;
  address: string;
  imageUrl: string;
  lat: number;
  lon: number;
  updated_date: Date;
}

const pinSchema = new Schema<IPin>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  googleUrl: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Pin: Model<IPin> =
  mongoose.models.Pin || mongoose.model<IPin>("Pin", pinSchema);
export default Pin;
