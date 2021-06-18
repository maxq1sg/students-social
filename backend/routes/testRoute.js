import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Group from "../models/Group.js";
import protect from "../middleware/protect.js";
import mongoose from "mongoose";
import Course from "../models/Course.js";

const router = express.Router();

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const max = await User.find({
//       courses: {
//         $in: [mongoose.Types.ObjectId("60a27f04d3c1f36f0850daf0")],
//       },
//       teacher: false,
//     });
//     res.json(max);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
router.get("/students", async (req, res) => {
  const courses = await User.updateMany({
    $set: { friends: [] },
  });

  res.json({ success: true });
});
export default router;
