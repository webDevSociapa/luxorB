import mongoose, { Schema } from "mongoose";

const careerSchema = new Schema({
  name: String,
  email: String,
  contactNumber: String,
  profile: String,
  resume_folder_name: String,
  file_name: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

const careerModel = mongoose.model("career", careerSchema);

export { careerModel };
