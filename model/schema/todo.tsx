import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  todoName: { type: String, required: true },
  body: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
