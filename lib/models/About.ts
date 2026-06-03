import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  name: string;
  email: string;
  location: string;
  availability: string;
  title: string;
  description: string[];
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    availability: {
      type: String,
      required: [true, 'Availability is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: [String],
      default: [],
    },
    profileImage: {
      type: String,
      default: '/assets/profile.png',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);
