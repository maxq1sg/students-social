import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name }).populate("group");
    if (user && (await user.matchPasswords(password))) {
      res.json({
        name: user.name,
        status: user.status,
        teacher: user.teacher,
        courses: user.courses,
        group: user.group,
        id: user._id,
      });
    } else throw new Error("Неверные данные при входе в систему");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
