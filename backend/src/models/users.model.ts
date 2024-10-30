import { Schema, model } from 'mongoose';
import { UserModel } from '../interfaces';

const userSchema = new Schema<UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

export const User = model<UserModel>('User', userSchema);