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
      tasks,
    } = req.body;
    const course = new Course({
      name,
      password,
      beginDate,
      endDate,
      groups,
      teachers,
      tasks,
      description,
    });
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id: courseId } = req.params;
    const { user: userId } = req.query;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId).populate("teachers");
    if (!user) {
      throw new Error("Пользователя не существует!");
    }
    let hasAccess = false;
    if (!user.group) {
      for (let teacher of course.teachers) {
        if (teacher._id.toString() == user._id.toString()) {
          hasAccess = true;
        }
      }
    } else {
      for (let group of course.groups) {
        if (group.toString() == user.group.toString()) {
          hasAccess = true;
        }
      }
    }
    if (hasAccess) {
      res.json(course);
    } else {
      throw new Error(
        JSON.stringify({
          name: course.name,
          description: course.description,
          teachers: course.teachers,
        })
      );
    }
  } catch (error) {
    res.status(404).json({ message: JSON.parse(error.message) });
  }
});
export default router;
