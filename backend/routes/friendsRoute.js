import express from "express";
import protect from "../middleware/protect.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Course from "../models/Course.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { first, second } = req.query;
    const firstUser = await User.findById(first);
    const secondUser = await User.findById(second);
    let areFriends = false;
    for (const friend of firstUser.friends) {
      if (friend == second) {
        areFriends = true;
      }
    }
    if (areFriends) {
      firstUser.friends = firstUser.friends.filter(
        (friend) => friend.toString() !== second.toString()
      );
      await firstUser.save();
      secondUser.friends = secondUser.friends.filter(
        (friend) => friend.toString() !== first.toString()
      );
      await secondUser.save();
    } else {
      firstUser.friends.push(secondUser);
      await firstUser.save();
      secondUser.friends.push(firstUser);
      await secondUser.save();
    }
    res.json(secondUser.friends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
