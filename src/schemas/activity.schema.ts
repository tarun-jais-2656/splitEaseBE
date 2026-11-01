import { Schema, model, models, Types } from 'mongoose';

export type ActivityType =
  | 'EXPENSE_ADDED'
  | 'EXPENSE_UPDATED'
  | 'EXPENSE_DELETED'
  | 'SETTLEMENT_ADDED'
  | 'MEMBER_ADDED';

export interface IActivity {
  userIds: Types.ObjectId[];
  groupId: Types.ObjectId;
  type: ActivityType;
  payload: Record<string, unknown>;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'EXPENSE_ADDED',
        'EXPENSE_UPDATED',
        'EXPENSE_DELETED',
        'SETTLEMENT_ADDED',
        'MEMBER_ADDED',
      ],
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
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

// Retrieve activities visible to a user, newest first.
activitySchema.index({ userIds: 1, createdAt: -1 });

export const ActivityModel =
  models.Activity || model<IActivity>('Activity', activitySchema);
