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
    // for (let item of groups) {
    //   const groupMembers = await User.find({ group: item });
    //   console.log(groupMembers);
    //   for (let member of groupMembers) {
    //     member.courses.push(course);
    //     await member.save();
    //   }
    // }
    // for (let item of teachers) {
    //   const user = await User.findById(item);
    //   user.courses.push(course);
    //   await user.save();
    // }
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
    console.log("course", course);
    if (!user.group) {
      for (let teacher of course.teachers) {
        // console.log(teacher.toString(), user._id.toString());
        if (teacher.toString() == user._id.toString()) {
          console.log("equal");
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
