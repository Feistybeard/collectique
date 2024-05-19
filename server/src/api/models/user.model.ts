import mongoose, { Document } from "mongoose";
import { hashPassword, comparePassword } from "../utils/helpers";

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  hashPassword(): Promise<void>;
  verifyPassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
});

UserSchema.methods.hashPassword = async function () {
  this.password = await hashPassword(this.password);
};

UserSchema.methods.verifyPassword = async function (password: string) {
  return comparePassword(password, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
