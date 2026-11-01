import { Schema, model, models, Types } from 'mongoose';

interface IGroupMember {
  userId: Types.ObjectId;
  joinedAt: Date;
}

export interface IGroup {
  name: string;
  createdBy: Types.ObjectId;
  members: IGroupMember[];
  isArchived: boolean;
}

const groupMemberSchema = new Schema<IGroupMember>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: {
      type: [groupMemberSchema],
      default: [],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

// Helps find groups that contain a particular user.
groupSchema.index({ 'members.userId': 1 });

export const GroupModel =
  models.Group || model<IGroup>('Group', groupSchema);
