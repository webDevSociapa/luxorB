import mongoose, { Schema } from "mongoose";
import collection from "./../collection/collection.js";

let penCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  product_category_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collection.rg_global_master_category_product,
  },
  color: String,
  master_folder_name: String,
  product_folder_name: String,
  file_name: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

let productWithProductCategory = new Schema({
  product_cat_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collection.rg_global_master_category_product,
  },
  name: String,
  description: String,
  icon: String,
  did_you_know: String,
  color: String,
  root_folder_name: String,
  product_root_folder_name: String,
  file_name: String,
  product_file_names: {
    type: [String],
    // default:()=> []
  },
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

let markerCategorySchema = new Schema({
  marker_category: {
    type: String,
    required: true,
  },
  color: String,
  master_folder_name: String,
  file_name: String,
  product_folder_name: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

let penSchema = new Schema({
  category_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collection.rg_global_master_pen_category,
  },
  main_category_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collection.rg_global_master_category_product,
  },
  name: String,
  color: String,
  description: String,
  icon: String,
  did_you_know: String,
  root_folder_name: String,
  product_root_folder_name: String,
  file_name: String,
  color_variant: Array,

  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

let heighlighterSchema = new Schema({
  name: String,
  color: String,
  description: String,
  icon: String,
  did_you_know: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

let MarkersSchema = new Schema({
  marker_category_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collection.rg_global_master_marker_category,
  },
  name: String,
  color: String,
  description: String,
  icon: String,
  did_you_know: String,
  root_folder_name: String,
  file_name: String,
  created_on: {
    type: Date,
    default: () => new Date(),
  },
});

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

const ContactModel = mongoose.model("contacts", contactSchema);

// category schema
let penCategoryModel = mongoose.model(
  collection.rg_global_master_pen_category,
  penCategorySchema
);
let markerCateroyModel = mongoose.model(
  collection.rg_global_master_marker_category,
  markerCategorySchema
);
// category schema

// their products
let MainCatProductModel = mongoose.model(
  collection.rg_global_master_main_cat_wise_product,
  productWithProductCategory
);
let Products = mongoose.model(collection.rg_global_master_pen, penSchema);
let heighlighter = mongoose.model(
  collection.rg_global_master_heighlighter,
  heighlighterSchema
);
let Makers = mongoose.model(collection.rg_global_master_marker, MarkersSchema);
// their products

export {
  Products,
  heighlighter,
  MainCatProductModel,
  markerCateroyModel,
  Makers,
  penCategoryModel,
  ContactModel,
};
