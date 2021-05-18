import express from "express";
import Course from "../../models/Course.js";

const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = {
      name: { $regex: new RegExp(`${keyword}`), $options: "i" },
    };
    const courses = await Course.find(query);
    console.log(courses);
    res.json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
