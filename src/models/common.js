import mongoose, { Schema } from "mongoose";
import collection from "./../collection/collection.js";

let category_product_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  master_folder_name: String,
  product_folder_name: String,
  file_name: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

let categoryProductModel = mongoose.model(
  collection.rg_global_master_category_product,
  category_product_schema
);

export { categoryProductModel };
