import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    for (let item of users) {
      item.courses = [];
      await item.save();
    }
    res.json({ mes: "success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
