const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["Low", "Medium", "High"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
