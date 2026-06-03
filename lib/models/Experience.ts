import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
  logo: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    period: {
      type: String,
      required: [true, 'Period is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    achievements: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    logo: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
