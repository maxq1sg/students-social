import express from "express";
import Course from "../../models/Course.js";
import Group from "../../models/Group.js";
import User from "../../models/User.js";
const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = {
      name: { $regex: new RegExp(`${keyword}`), $options: "i" },
    };
    const courses = await Course.find(query).populate("teachers");
    console.log(courses);
    res.json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const { keyword } = req.query;
    console.log(keyword);

    const query = {
      fullName: { $regex: new RegExp(`${keyword}`), $options: "i" },
    };
    const users = await User.find(query);
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/groups", async (req, res) => {
  try {
    const { keyword } = req.query;
    console.log("in groups", keyword);

    const query = {
      profession: { $regex: new RegExp(`${keyword}`), $options: "i" },
    };
    const groups = await Group.find(query);
    res.json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
