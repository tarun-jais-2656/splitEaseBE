import { Schema, model, models, Types } from 'mongoose';

export type ExpenseSplitType = 'EQUAL' | 'EXACT' | 'PERCENT';

interface IExpenseSplit {
  userId: Types.ObjectId;
  share: number;
}

export interface IExpense {
  groupId: Types.ObjectId;
  description: string;
  amount: number;
  paidBy: Types.ObjectId;
  splitType: ExpenseSplitType;
  splits: IExpenseSplit[];
  expenseDate: Date;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
}

const expenseSplitSchema = new Schema<IExpenseSplit>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    share: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Share must be an integer amount in paise',
      },
    },
  },
  {
    _id: false,
  },
);

const expenseSchema = new Schema<IExpense>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Amount must be an integer amount in paise',
      },
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    splitType: {
      type: String,
      enum: ['EQUAL', 'EXACT', 'PERCENT'],
      required: true,
    },
    splits: {
      type: [expenseSplitSchema],
      required: true,
      validate: {
        validator: (splits: IExpenseSplit[]) => splits.length > 0,
        message: 'At least one expense split is required',
      },
    },
    expenseDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

// Retrieve a group's expenses, newest first.
expenseSchema.index({ groupId: 1, expenseDate: -1 });

// Support searching expense descriptions.
expenseSchema.index({ description: 'text' });

export const ExpenseModel =
  models.Expense || model<IExpense>('Expense', expenseSchema);
