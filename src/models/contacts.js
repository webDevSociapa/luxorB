import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: String,
  email: String,
  contactNumber: String,
  companyName: String,
  requirements: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

const contactModel = mongoose.model("contacts", contactSchema);

export { contactModel };
