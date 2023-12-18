import { penCategoryModel } from "../../models/products.js";
import { Products as PenProduct } from "../../models/products.js";

//get sub-category new
export async function get_all_pen_category() {
  try {
    let all_pen_cat = await penCategoryModel.find({});
    return Promise.resolve(all_pen_cat);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

//delete sub-category new
export async function delete_pen_category(id) {
  try {
    let deletedSubCat = await penCategoryModel.findByIdAndDelete(id);
    return Promise.resolve(deletedSubCat);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getPenByCategory(_id) {
  try {
    let all_pen_cat = await PenProduct.find({ category_type: _id });
    return Promise.resolve(all_pen_cat);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
