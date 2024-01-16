import mongoose, { Schema } from "mongoose";

const careerCSV = new Schema({
  name: String,
  path: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

const careerCSVModel = mongoose.model("careerCSV", careerCSV);

export { careerCSVModel };
