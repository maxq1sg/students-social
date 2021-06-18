import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const courseSchema = mongoose.Schema({
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      // autopopulate: { maxDepth: 2 },
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Group",
      // autopopulate: { maxDepth: 2 },
    },
  ],
  students: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  ],
  name: String,
  password: String,
  description: String,
  beginDate: Date,
  endDate: Date,
  tasks: [
    {
      text: String,
    },
  ],
});
// courseSchema.plugin(autopopulate);
const Course = mongoose.model("Course", courseSchema);

export default Course;
