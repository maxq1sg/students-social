import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Group from "../models/Group.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    password: oldPassword,
    status,
    group: groupId,
    courses,
    teacher,
    isOnline,
    fullName,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(oldPassword, salt);

  const group = await Group.findById(groupId);
  const user = new User({
    name,
    password,
    status,
    group,
    courses,
    teacher,
    isOnline,
    fullName,
  });
  await user.save();
  res.json(user);
});

export default router;
