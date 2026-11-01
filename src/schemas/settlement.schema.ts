import { Schema, model, models, Types } from 'mongoose';

export interface ISettlement {
  groupId: Types.ObjectId;
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  amount: number;
  note: string;
  createdAt: Date;
}

const settlementSchema = new Schema<ISettlement>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Settlement amount must be an integer amount in paise',
      },
    },
    note: {
      type: String,
      trim: true,
      default: '',
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

// Retrieve settlements belonging to a group, newest first.
settlementSchema.index({ groupId: 1, createdAt: -1 });

export const SettlementModel =
  models.Settlement || model<ISettlement>('Settlement', settlementSchema);
