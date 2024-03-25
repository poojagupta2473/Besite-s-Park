import { Schema, model } from "mongoose";

const AddressSchema = Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String, default: 9999999999 },
  city: { type: String },
  district: { type: String },
  pincode: { type: Number },
  state: { type: String },
  street: { type: String },
  type: { type: String },
});

const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, default: 9999999999 },
  age: { type: Number },
  gender: { type: String },
  dob: { type: Date },
  pincode: { type: Number },
  address: { type: AddressSchema },
  role: { type: Number, default: 0 },
});

const User = model("User", userSchema);
export default User;
