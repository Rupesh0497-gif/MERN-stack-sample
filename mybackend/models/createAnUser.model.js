const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const createUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
      },phoneNumber: {
        type: String,
        required: true,
        trim: true
      },userId: {
        type: String,
        required: true,
        trim: true
      }
  },
  {
    timestamps: true,
  }
);

const CreateUser = mongoose.model("UserAccounts", createUserSchema);
module.exports = CreateUser;
