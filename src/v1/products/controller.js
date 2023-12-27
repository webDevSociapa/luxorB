import { categoryProductModel } from "../../models/common.js";
import {
  MainCatProductModel,
  Makers,
  Products,
  markerCateroyModel,
  penCategoryModel,
  ContactModel,
} from "./../../models/products.js";

// ---------------------addc cat -------------------

// export async function addProductCategory(prd_cat_object) {
//        try {
//         let  new_prd =await product_ctg_model(prd_cat_object)
//         await new_prd.save()
//         return Promise.resolve(new_prd)
//      }
//      catch(err ) {
//          return Promise.reject(err.message)
//      }
// }

//==================get-all-products(new collection)==================//

export async function getAllGlobalProducts(_id, page_no) {
  try {
    let limit = 20;
    let skip = page_no ? (page_no - 1) * limit : 0;

    let prd_names = await categoryProductModel.findById(_id);
    if (prd_names == null) {
      const penData = await Products.find({ category_type: _id })
        .limit(limit)
        .skip(skip);
      const prds_count = await Products.find({ category_type: _id }).count();
      return Promise.resolve({ cat_wise_products: penData, total: prds_count });
    } else {
      const otherData = await Products.find({ main_category_type: _id })
        .limit(limit)
        .skip(skip);
      const prd_count = await Products.find({
        main_category_type: _id,
      }).count();
      return Promise.resolve({
        cat_wise_products: otherData,
        total: prd_count,
      });
    }
  } catch (err) {
    return Promise.reject(err.message);
  }
}

// ---------------------addc cat -------------------

// ---------------------add prd ----------------------------

export async function addProduct(prd_object) {
  try {
    let new_prd = await Products(prd_object);
    await new_prd.save();
    return Promise.resolve(new_prd);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
export async function addMainCatWiseProduct(prd_object) {
  try {
    let new_prd = await MainCatProductModel(prd_object);
    await new_prd.save();
    return Promise.resolve(new_prd);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
export async function addSubCategory(sub_cat_object) {
  try {
    let new_prd = await penCategoryModel(sub_cat_object);
    await new_prd.save();
    return Promise.resolve(new_prd);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function updateProduct(id, prd_object) {
  try {
    let new_prd = await Products.findByIdAndUpdate(id, prd_object);
    return Promise.resolve(new_prd);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function updateSubCategory(id, sub_cat_object) {
  try {
    let new_prd = await penCategoryModel.findByIdAndUpdate(id, sub_cat_object);
    await new_prd.save();
    return Promise.resolve(new_prd);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getProductById(id) {
  try {
    let new_prd = await Products.findById(id);
    return Promise.resolve(new_prd);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getAllMasterPens() {
  try {
    let get_all_pens = await Products.find({});
    return Promise.resolve(get_all_pens);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function deleteMasterPenById(id) {
  try {
    let deletedPen = await Products.findByIdAndDelete(id);
    return Promise.resolve(deletedPen);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getPenById(_id) {
  try {
    let get_product = await Products.findById(_id);
    let popular_pics;
    if (get_product.category_type) {
      popular_pics = await Products.find({
        category_type: get_product.category_type,
      });
      if (popular_pics.length > 3) {
        popular_pics = popular_pics.slice(0, 3);
      }
    }

    return Promise.resolve({ product: get_product, popular_pics });
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getAllCategories() {
  try {
    let all_cat_products = await categoryProductModel.find({});
    return Promise.resolve(all_cat_products);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
export async function deleteCategory(id) {
  try {
    let deleted_category = await categoryProductModel.findByIdAndDelete(id);
    return Promise.resolve(deleted_category);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

// ---------------------add prd ----------------------------

// ------------get all category -------------------------

export async function getMasterMainCatWiseProducts() {
  try {
    let master_main_cat_wise_products = await MainCatProductModel.find({});
    return Promise.resolve(master_main_cat_wise_products);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getAllProductsCategory() {
  try {
    let all_cat_products = await categoryProductModel.find({});

    if (all_cat_products.length > 0) {
      var ctg_with_sub_cat = await Promise.all(
        all_cat_products.map(async (ele) => {
          if (ele.name == "Pens") {
            let sub_mene_val = await penCategoryModel.find();
            return { ...ele, sub_menu: sub_mene_val };
          } else if (ele.name == "Markers") {
            let sub_mene_val = await markerCateroyModel.find();
            return { ...ele, sub_menu: sub_mene_val };
          } else {
            return ele;
          }
        })
      );

      return Promise.resolve(ctg_with_sub_cat);
    }

    return Promise.resolve([]);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

// ------------get all category -------------------------

// ------------get all category -------------------------

export async function getAllCatWiseProducts(_id, cat_type, page_no) {
  try {
    let limit = 20;
    let skip = page_no ? (page_no - 1) * limit : 0;

    let prd_names = await categoryProductModel.findById(_id);
    //  console.log(prd_names , cat_type )

    if (prd_names == null) {
      if (
        cat_type.trim() == "metal pens" ||
        cat_type.trim() == "everyday writing"
      ) {
        let cat_wise_products = await Products.find({ category_type: _id })
          .populate("category_type")
          .limit(limit)
          .skip(skip);
        let prd_count = await Products.find({ category_type: _id })
          .populate("category_type")
          .count();

        return Promise.resolve({ cat_wise_products, total: prd_count });
      } else if (
        cat_type.trim() == "Permanent Markers" ||
        cat_type.trim() == "WHITEBOARD MARKERS" ||
        cat_type.trim() == "Whiteboard Care Kits"
      ) {
        let cat_wise_products = await Makers.find({ marker_category_type: _id })
          .populate("marker_category_type")
          .limit(limit)
          .skip(skip);
        let prd_count = await Makers.find({ marker_category_type: _id })
          .populate("marker_category_type")
          .count();
        return Promise.resolve({ cat_wise_products, total: prd_count });
      }
    } else {
      let cat_wise_products = await MainCatProductModel.find({
        product_cat_type: _id,
      })
        .populate("product_cat_type")
        .limit(limit)
        .skip(skip);
      let prd_count = await MainCatProductModel.find({ product_cat_type: _id })
        .populate("product_cat_type")
        .count();
      console.log(cat_wise_products);
      return Promise.resolve({ cat_wise_products, total: prd_count });
    }
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getProductByOnlyId({ selected_prd, prd_id }) {
  try {
    let find_final_cat = "";
    let master_cat_id = prd_id;

    let all_prd_cat = await categoryProductModel.find({}).select("name");
    let all_pen_cat = await penCategoryModel.find({}).select("category");
    let all_marker_cat = await markerCateroyModel
      .find({})
      .select("marker_category");

    const { _id: product_id, category: selected_category } = selected_prd;

    find_final_cat = all_prd_cat.find((ele) => ele._id == master_cat_id);

    if (find_final_cat != null) {
      let main_prd = await MainCatProductModel.findById(product_id);
      return Promise.resolve(main_prd);
    }

    find_final_cat = all_pen_cat.find((ele) => ele._id == master_cat_id);

    if (find_final_cat != null) {
      let pen_prd = await Products.findById(product_id);
      return Promise.resolve(pen_prd);
    }

    find_final_cat = all_marker_cat.find((ele) => ele._id == master_cat_id);

    if (find_final_cat != null) {
      let marker_prd = await Makers.findById(product_id);
      return Promise.resolve(marker_prd);
    }

    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(err.message);
  }
}

export async function getSubCategoryById(category_id) {
  try {
    const data = await penCategoryModel.find({
      product_category_type: category_id,
    });
    console.log("penData-->", data);
    return Promise.resolve(data);
  } catch (err) {
    console.log(err.message);
    return Promise.reject(err.message);
  }
}

export async function addStampById(id, stampData) {
  try {
    const data = await Products.findById(id);
    let addedStamp;
    if (data) {
      addedStamp = await Products.findByIdAndUpdate(id, {
        $set: {
          stamps: stampData,
        },
      });
      return Promise.resolve(addedStamp);
    } else {
      throw new Error("not found");
    }
  } catch (err) {
    return Promise.reject(err.message);
  }
}
