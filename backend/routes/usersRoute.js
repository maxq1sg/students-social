import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await User.find({ teacher: true });
    if (!teachers.length) {
      throw new Error("Преподаватели не найдены!");
    }
    res.json(
      teachers.map((teacher) => ({
        value: teacher._id,
        label: teacher.fullName,
      }))
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//ГОВНОКОД
router.get("/:id/courses", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("Такого пользователя не существует");
    }
    res.json(user.courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
export default router;
