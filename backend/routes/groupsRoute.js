import express from "express";
import mongoose from "mongoose";
import protect from "../middleware/protect.js";
import Course from "../models/Course.js";
import Group from "../models/Group.js";
import User from "../models/User.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find({});
    res.json(
      groups.map((item, index) => ({
        value: item._id,
        label: `${item.short}, ${item.year} курс`,
      }))
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      throw new Error("Группа не найдена!");
    }
    res.json(group);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id/members", async (req, res) => {
  try {
    const { id } = req.params;
    const members = await User.find({
      group: mongoose.Types.ObjectId(id),
    }).select("fullName");
    if (!members) {
      throw new Error("Пользователи не найдены");
    }
    res.json(members);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id/courses", async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({
      groups: {
        $in: [mongoose.Types.ObjectId(id)],
      },
    }).select("name");
    if (!courses) {
      throw new Error("Курсы не найдены!");
    }
    res.json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;
