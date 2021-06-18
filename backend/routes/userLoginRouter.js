import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const router = express.Router();
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name }).populate("group");

    const groupId = user.teacher ? null : user.group._id;
    const courses = await Course.find({
      groups: {
        $in: [mongoose.Types.ObjectId(groupId)],
      },
    });
    console.log(courses);
    if (user && (await user.matchPasswords(password))) {
      res.json({
        name: user.name,
        status: user.status,
        teacher: user.teacher,
        courses,
        group: user.group,
        id: user._id,
        token: generateToken(user._id),
        friends: user.friends,
        fullName: user.fullName,
      });
    } else throw new Error("Неверные данные при входе в систему");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
