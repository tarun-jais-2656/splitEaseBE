import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

// Ensure every email address is unique.
userSchema.index({ email: 1 }, { unique: true });

export const UserModel =
  models.User || model<IUser>('User', userSchema);
