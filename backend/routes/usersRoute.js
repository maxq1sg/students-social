import express from "express";
import protect from "../middleware/protect.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import bcrypt from "bcryptjs";

const router = express.Router();

const getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

router.get("/teachers", protect, async (req, res) => {
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

router.get("/:id/friends", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("friends");
  res.json(user.friends);
});

router.post("/:id/editName", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, name, password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Пользователь не найден!");
    }
    if (await user.matchPasswords(password)) {
      user.fullName = fullName || user.fullName;
      user.name = name || user.name;
      await user.save();
      res.json({ fullName: user.fullName, name: user.name });
    } else {
      throw new Error("Неверный пароль!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/:id/editPassword", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, newPasswordConfirm } = req.body;
    if (newPasswordConfirm !== newPassword) {
      throw new Error("Пароли не совпадают!");
    }
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Пользователь не найден!");
    }
    if (await user.matchPasswords(oldPassword)) {
      user.password = await getHashPassword(newPassword);
      await user.save();
      res.json(true);
    } else {
      throw new Error("Неверный пароль!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id/courses", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.teacher) {
      const courses = await Course.find({
        teachers: {
          $in: [mongoose.Types.ObjectId(id)],
        },
      }).populate("teachers");

      res.json(courses);
    } else {
      const courses = await Course.find({
        groups: {
          $in: [mongoose.Types.ObjectId(user.group._id)],
        },
      }).populate("teachers");
      res.json(courses);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id/edit", async (req, res) => {
  try {
    const { idFromLogin } = req.query;
    const { id } = req.params;
    const user = await User.findById(id);
    if (user && idFromLogin === id) {
      res.json(user);
    } else {
      throw new Error(
        "Вы не имеете права на редактирование данного пользователя"
      );
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const errorMessage = "Такого пользователя не существует";
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error(errorMessage);
    }
    const user = await User.findById(id).lean();
    if (!user) {
      throw new Error(errorMessage);
    }
    const groupId = user.teacher ? null : user.group._id;
    if (user.teacher) {
      const courses = await Course.find({
        teachers: {
          $in: [mongoose.Types.ObjectId(user._id)],
        },
      });

      res.json({ ...user, courses });
    } else {
      const courses = await Course.find({
        groups: {
          $in: [mongoose.Types.ObjectId(groupId)],
        },
      });

      res.json({ ...user, courses });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
