import express from "express";
import Group from "../models/Group.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("yes");
    const groups = await Group.find({});
    res.json(
      groups
        .map((item, index) => ({
          value: item._id,
          label: `${item.short}, ${item.year} курс`,
        }))
    );
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
