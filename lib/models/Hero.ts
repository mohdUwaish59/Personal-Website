import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  typingTexts: string[];
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    typingTexts: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
    },
    linkedinUrl: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);
