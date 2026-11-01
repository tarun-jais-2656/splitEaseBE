import { Schema, model, models, Types } from 'mongoose';

export interface ISession {
  userId: Types.ObjectId;
  deviceId: string;
  deviceType: 1 | 2 | 3;
  timezone: string;
  lang: 'en' | 'hi';
  loginAt: Date;
  lastUsedAt: Date;
  revokedAt: Date | null;
  expiresAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
      trim: true,
    },
    deviceType: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    timezone: {
      type: String,
      required: true,
      trim: true,
    },
    lang: {
      type: String,
      enum: ['en', 'hi'],
      required: true,
    },
    loginAt: {
      type: Date,
      default: Date.now,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
    revokedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

// Find sessions belonging to a user on a particular device.
sessionSchema.index({ userId: 1, deviceId: 1 });

// Automatically delete expired sessions. MongoDB to automatically delete documents after their expiry date.
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const SessionModel =
  models.Session || model<ISession>('Session', sessionSchema);
