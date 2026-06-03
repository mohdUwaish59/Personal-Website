import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'rag' | 'other';
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    level: {
      type: Number,
      required: [true, 'Skill level is required'],
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['frontend', 'backend', 'database', 'rag', 'other'],
    },
    icon: {
      type: String,
      default: 'Code',
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

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
