import express from "express";
import pkg from "googleapis";
import protect from "../../middleware/protect.js";
import { getSpreedSheetId, parseSchedule } from "./scheduleParse.js";
const { google } = pkg;

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { year, short } = req.body;
    if (!year) {
      throw new Error(
        "Расписание для преподавателей в данный момент не доступно!"
      );
    }
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const spreadsheetId = getSpreedSheetId(year);
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const {
      data: { values },
    } = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: short,
    });

    const schedule = parseSchedule(values);
    res.json(schedule);
  } catch (error) {
    const message = error.message || "Расписание в данный момент не доступно!";
    res.status(500).json({ message });
  }
});

export default router;
