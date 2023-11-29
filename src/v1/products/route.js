import express from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import {
  addProduct,
  getAllProductsCategory,
  getAllCatWiseProducts,
  getProductByOnlyId,
  getAllCategories,
  getAllMasterPens,
  getSubCategoryById,
  updateProduct,
  getProductById,
  getMasterMainCatWiseProducts,
} from "./controller.js";
let prd = express.Router();

prd.get("/get-all-categories", (req, res) => {
  getAllCategories()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

prd.get("/get-master-main-cat-wise-products", (req, res) => {
  getMasterMainCatWiseProducts()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

prd.post("/add-product", (req, res) => {
  // {
  //     name: nameRef.current.value,
  //     category_type: selectedCategory,
  //     color: colorRef.current.value,
  //     description: descriptionRef.current.value,
  //     icon: iconRef.current.value,
  //     did_you_know: didYouKnowRef.current.value,
  //     file_name: fileNameRef.current.value,
  //     root_folder_name: rootFolderNameRef.current.value,
  //   };
  const data = req.body;
  console.log("data->", data);
  addProduct(data)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});
prd.post("/update-product/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  console.log("data->", data);
  console.log("id->", id);
  updateProduct(id, data)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

prd.get("/get-all-pens", (req, res) => {
  getAllMasterPens()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});
prd.post("/get-product-by-id", (req, res) => {
  const { id } = req.body;
  getProductById(id)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

prd.get("/get-all-products-category", (req, res) => {
  getAllProductsCategory()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

prd.get("/get-cate-wise-products", (req, res) => {
  let cat_id = req.query._id;
  let cat_type = req.query.cat_type;
  let page_no = req.query.page_no;

  getAllCatWiseProducts(cat_id, cat_type, page_no)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

prd.post("/get-pen-subcategory", (req, res) => {
  console.log("body-->", req.body);
  let { category_id } = req.body;

  getSubCategoryById(category_id)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

// prd.get('/get-cate-wise-products' , (req, res )=>{
//     let cat_id  = req.query._id
//     getAllCatWiseProducts(cat_id).then((result)=>{
//        res.send(succes_service_response(result))
//     }).catch(err=>{
//       res.send(fail_service_response(err))
//    })

// })

prd.post("/get-product-by-only-id", (req, res) => {
  let model = {};
  model.selected_prd = req.body.selected_prd;
  model.prd_id = req.body.prd_id;
  getProductByOnlyId(model)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

export default prd;
