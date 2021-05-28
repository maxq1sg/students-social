import express from "express";
import protect from "../middleware/protect.js";
import Course from "../models/Course.js";
import Group from "../models/Group.js";
import User from "../models/User.js";
const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const {
      name,
      password,
      beginDate,
      endDate,
      groups,
      teachers,
      description,
    } = req.body;
    console.log(teachers);
    const course = new Course({
      name,
      password,
      beginDate,
      endDate,
      groups,
      teachers,
      tasks: [],
      description,
    });
    await course.save();
    for (let item of groups) {
      const groupMembers = await User.find({ group: item });
      for (let member of groupMembers) {
        member.courses.push(course);
        await member.save();
      }
    }
    for (let item of teachers) {
      const user = await User.findById(item);
      user.courses.push(course);
      await user.save();
    }
    res.json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user: userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Пользователя не существует!");
    }
    for (let course of user.courses) {
      console.log(course._id);
      if (course._id == id) {
        res.json(course);
      }
    }
    throw new Error("Нет доступа к курсу!");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;
