import express from "express";
import Group from "../models/Group.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { profession, year, short } = req.body;

  const group = new Group({
    profession,
    year,
    short,
  });
  await group.save();
  res.json(group);
});

export default router;
