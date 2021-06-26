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
    if (!user) {
      incorrectData();
    }
    const groupId = user.teacher ? null : user.group._id;
    let courses;
    if (user.teacher) {
      courses = await Course.find({
        teachers: {
          $in: [mongoose.Types.ObjectId(user._id)],
        },
      });
    } else {
      courses = await Course.find({
        groups: {
          $in: [mongoose.Types.ObjectId(groupId)],
        },
      });
    }

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
    } else incorrectData();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

function incorrectData() {
  throw new Error("Неверные данные при входе в систему");
}

export default router;
