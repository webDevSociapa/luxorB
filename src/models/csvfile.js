import mongoose, { Schema } from "mongoose";

const csvFileSchema = new Schema({
  name: String,
  path: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

const csvFileModel = mongoose.model("csvFiles", csvFileSchema);

export { csvFileModel };
