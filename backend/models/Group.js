import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  profession: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
});

const Group = mongoose.model("Group", groupSchema);
export default Group;
