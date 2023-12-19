import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture:{
    type: String,
    required: true,
  },
  course_name:{
    type: String,
    required: true,
  },
  phone_no:{
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default : false
  },
  created_on: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
