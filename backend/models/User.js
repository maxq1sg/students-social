import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import autopopulate from "mongoose-autopopulate";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  teacher: {
    type: Boolean,
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    autopopulate: { maxDepth: 2 },
    ref: "Group",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
      autopopulate: { maxDepth: 2 },
    },
  ],
});

userSchema.plugin(autopopulate);
userSchema.methods.matchPasswords = function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
