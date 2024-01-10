import express from "express";
let xl = express.Router();
import xlsx from "node-xlsx";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  MainCatProductModel,
  Makers,
  Products,
  heighlighter,
  markerCateroyModel,
  penCategoryModel,
} from "./../models/products.js";
import { categoryProductModel } from "../models/common.js";
import mongoose from "mongoose";
import multer from "multer";

import * as fses from "fs-extra";
import { careerModel } from "../models/careers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "my-uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const __dirname = dirname(fileURLToPath(import.meta.url));

let ObjectId = mongoose.Types.ObjectId;

xl.get("/read-and-store", (req, res) => {
  const workSheetsFromBuffer = xlsx.parse(
    fs.readFileSync(`${__dirname}/luxer_pen_data.xlsx`)
  );
  // Parse a file
  const workSheetsFromFile = xlsx.parse(`${__dirname}/luxer_pen_data.xlsx`);

  // console.log(workSheetsFromFile , )

  // pens

  // "category_type":"6537d22343346433a3754325",
  // "name":"Konark",
  // "description":"Konark is a premium ball pen that boasts a finely executed engraved design, a designer body with a flawless twist mechanism, and a charismatic refill. This exquisite pen is elegantly packaged, making it an ideal gift choice." ,
  // "icon":" Finely Engraved Design Flawless Twist Mechanism Perfect For Gifting " ,
  // "did_you_know":"Renowned for their exceptional durability and long-lasting quality, metal luxury pens are crafted from premium materials, ensuring their robustness and longevity."

  let model = {};

  let finnal_arr = [];

  // workSheetsFromFile[7].data.map((ele ,i, ar)=>{

  // if( i>0) {
  //     ele.map((item , ind , arr )=>{

  //               if(  arr[ind]=="Permanent Markers " ) {
  //                   model['marker_category_type'] = '65397016d2ea5f856977cf94'
  //                }   else if( arr[ind]=="Whiteboard Care Kits") {
  //                   model['marker_category_type'] = '65397066f05601bf5d55de41'
  //                }else if(arr[ind]=="WHITEBOARD MARKERS"){
  //                   model['marker_category_type'] = '65397048d7b96ccee7f63082'
  //                }
  //        })
  //   }

  //     if(ar[i].length>0){
  //            if(i>0){
  //               // console.log(ar[i])
  //               model["name"]=ar[i][1],
  //               model["description"]=ar[i][2] ,
  //               model["icon"]=ar[i][3],
  //               model["did_you_know"]=ar[i][4]
  //               model['created_on'] = new Date()
  //               model['color'] = "all color"
  //               console.log(model)
  //                // finnal_arr.push(model)
  //                // store(model)
  //                store_markers(model)
  //               }
  //           }

  async function store_markers(model) {
    let inserted = await Makers(model);
    await inserted.save();
    console.log("saved ", model);
  }

  // async function save() {

  //   try{
  //     for(let i=0; i<finnal_arr.length ; i++) {
  //    console.log(finnal_arr[i])

  //         let inserted = await Products(finnal_arr[i])
  //         await inserted.save()
  //         console.log("saved")
  //     }
  //   }catch(err){
  //       console.log(err)
  //    }

  // }

  //  save()

  // heighlighters
  workSheetsFromFile[1].data.map((ele, i, ar) => {
    ele.map((item, ind, arr) => {
      if (arr[ind] == "Highlighters ") {
        model["category_type"] = "653911ba8e6902ca42c1d6e9";
      }
    });

    if (ar[i].length > 0 && i > 0) {
      // console.log(ar[i])
      (model["name"] = ar[i][0]),
        (model["description"] = ar[i][1]),
        (model["icon"] = ar[i][2]),
        (model["did_you_know"] = ar[i][3]);
      model["created_on"] = new Date();
      model["color"] = "all color";
      model["product_cat_type"] = "653911ba8e6902ca42c1d6e9";
      console.log(model);
      // finnal_arr.push(model)
      // storeAllProductsCatWise(model)
    }
  });

  // // arts and hobby
  // workSheetsFromFile[2].data.map((ele ,i, ar)=>{

  //    //  ele.map((item , ind , arr )=>{

  //    //            if(  arr[ind]=="Pens - Metal Pens " ) {
  //    //                model['category_type'] = '6537d22343346433a3754325'
  //    //             }   else if( arr[ind]=="Pens - Everyday Writing ") {
  //    //                model['category_type'] = '6537d24c6c7d38d8e947c8fa'
  //    //             }

  //    //    })

  //     if(ar[i].length>0){

  //               // console.log(ar[i])
  //               model["name"]=ar[i][0],
  //               model["description"]=ar[i][1] ,
  //               model["icon"]=ar[i][2],
  //               model["did_you_know"]=ar[i][3]
  //               model['created_on'] = new Date()
  //               model['color'] = "all color"
  //               model['product_cat_type'] = '653911ce6d8ae7473f9325a7'
  //             //   console.log(model)
  //             // finnal_arr.push(model)
  //              console.log("saved",i+1)
  //              storeAllProductsCatWise(model)
  //           }
  // })

  // // PCW -3 , echo-write-4 ,  stationary - 5 ,  value packs  - 6 , Markers - 7(pending) , kids coloring - 8
  // workSheetsFromFile[7].data.map((ele ,i, ar)=>{

  //     ele.map((item , ind , arr )=>{

  //               if(  arr[ind]=="Pens - Metal Pens " ) {
  //                   model['category_type'] = '6537d22343346433a3754325'
  //                }   else if( arr[ind]=="Pens - Everyday Writing ") {
  //                   model['category_type'] = '6537d24c6c7d38d8e947c8fa'
  //                }

  //       })

  //     if(ar[i].length>0){

  //               // console.log(ar[i])
  //               model["name"]=ar[i][0],
  //               model["description"]=ar[i][1] ,
  //               model["icon"]=ar[i][2],
  //               model["did_you_know"]=ar[i][3]
  //               model['created_on'] = new Date()
  //               model['color'] = "all color"
  //               model['product_cat_type'] = '653912399a126cb9bb92f68c'
  //                //   console.log(model)
  //                // finnal_arr.push(model)
  //               //  console.log(i+1)
  //               //  storeAllProductsCatWise(model)
  //           }
  // })

  async function storePens(model) {
    let inserted = await Products(model);
    await inserted.save();
    console.log("saved ", model);
  }

  async function storeHeighlighter(model) {
    let inserted = await heighlighter(model);
    await inserted.save();
    console.log("saved ", model);
  }

  async function storeAllProductsCatWise(model) {
    let inserted = await MainCatProductModel(model);
    await inserted.save();
    console.log("saved ", model);
  }

  res.send({
    msg: "succesfully done",
  });
});

// (async function(){
//     // let inserted = await Products.insertMany(finnal_arr)

// } )()

// xl.get("/insert-category-prd", async (req, res) => {
//   let ctg_prd = await categoryProductModel({
//     name: "PCW",
//   });

//   await ctg_prd.save();
//   console.log("saved");

//   res.send({ message: ctg_prd });
// });

// Add Category Data
xl.post("/insert-category-prd", async (req, res) => {
  const { name } = req.body;
  let ctg_prd = await categoryProductModel({
    name,
  });

  await ctg_prd.save();
  console.log("saved");

  res.send({ message: ctg_prd });
});

//Update category data
xl.patch("/update-category-prd/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  let ctg_prd = await categoryProductModel.findByIdAndUpdate(id, {
    name,
  });

  await ctg_prd.save();
  console.log("saved");

  res.send({ message: ctg_prd });
});

//upload-image for category(new api)
xl.post("/insert-category-image", upload.single("file"), async (req, res) => {
  //   console.log( req.body )
  const { _id, name } = req.body;
  console.log(req.file);
  let data = await categoryProductModel.findById(_id);

  let master_folder_name;

  if (data.master_folder_name) {
    master_folder_name = data.master_folder_name;
  } else {
    master_folder_name =
      "master_prd_icons/" + name.split(" ").join("_").toLowerCase();
  }

  console.log("master_folder_name category--->", master_folder_name);

  let placed_file = req.file.destination + req.file.filename;
  let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

  let new_folder_path = path.join(
    __dirname,
    "../../assets/" + master_folder_name + "/"
  );
  let final_path = new_folder_path + file_name;

  fses.move(placed_file, final_path, function (err) {
    if (err) throw err;

    console.log("Successfully renamed - AKA moved!");
    categoryProductModel
      .findByIdAndUpdate(_id, {
        $set: {
          master_folder_name: master_folder_name,
          file_name: file_name,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //   let folder_name = "master_prd_icons/"+req.query.folder_name
  //   let file_name = req.query.file_name
  //   let _id=  req.query._id

  //   console.log(folder_name , file_name , _id)

  //   let udpated = await categoryProductModel.findByIdAndUpdate(_id ,{$set :
  //    { master_folder_name:folder_name, file_name:file_name }
  // } ,     )

  res.send({ message: "updated" });
  // res.send({ message: master_folder_name });
});

// upload image for sub-category(new api)
xl.post(
  "/insert-sub-category-image",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    // const { sub_cat_id, product_name, product_id } = req.body;
    const { sub_cat_id } = req.body;
    console.log("data-->", sub_cat_id);
    let data;
    let master_folder_name;
    data = await penCategoryModel.findById(sub_cat_id);

    if (data) {
      master_folder_name = data.master_folder_name;
    } else {
      res.send({ message: "Not Found" });
    }

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name
    );
    let final_path = new_folder_path + "/" + file_name;

    fses.move(placed_file, final_path, async function (err) {
      if (err) throw err;

      // if (hasSubCategory) {
      //  model_data = await penCategoryModel.findById(_cat_id);
      //  if (model_data != null) {
      return penCategoryModel
        .findByIdAndUpdate(sub_cat_id, {
          $set: {
            file_name: file_name,
          },
        })
        .then((response) => {
          console.log(" Successfully renamed - AKA moved! ", response);
          return "pen added ", response;
        })
        .catch((error) => {
          console.log(error);
        });
      //   }
      //  }
    });

    /*   model_data = await markerCateroyModel.findById(_cat_id);

      if (model_data != null) {
        return Makers.findByIdAndUpdate(product_id, {
          $set: {
            root_folder_name: master_folder_name + "/products/",
            file_name: file_name,
          },
        })
          .then((response) => {
            return "marker added ", response;
          })
          .catch((error) => {
            console.log(error);
          });

        return;
      }
 */

    res.send({ message: "updated" });
  }
);

xl.get("/insert-marker-category", async (req, res) => {
  let mrkr_ctg = await markerCateroyModel({
    marker_category: "Whiteboard Care Kits",
  });

  await mrkr_ctg.save();
  console.log("saved", mrkr_ctg);

  res.send({ message: mrkr_ctg });
});

xl.get("/insert-cat-folder-images", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  let folder_name = "master_prd_icons/" + req.query.folder_name;
  let file_name = req.query.file_name;
  let _id = req.query._id;

  console.log(folder_name, file_name, _id);

  let udpated = await categoryProductModel.findByIdAndUpdate(_id, {
    $set: { master_folder_name: folder_name, file_name: file_name },
  });

  res.send({ message: udpated });
});

xl.get("/insert-cat-folder-images-for-markers", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  let folder_name = "master_prd_icons/markers/" + req.query.folder_name;
  let file_name = req.query.file_name;
  let _id = req.query._id;

  console.log(folder_name, file_name, _id);

  //   let udpated = await categoryProductModel.findByIdAndUpdate(_id ,{$set :
  //    { master_folder_name:folder_name, file_name:file_name }
  // } ,     )    // for all product

  let udpated = await markerCateroyModel.findByIdAndUpdate(_id, {
    $set: { root_folder_name: folder_name, file_name: file_name },
  });

  res.send({ message: udpated });
});

xl.get("/insert-cat-folder-images-for-pens", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  let folder_name = "master_prd_icons/pens/" + req.query.folder_name;
  let file_name = req.query.file_name;
  let _id = req.query._id;

  console.log(folder_name, file_name, _id);

  let udpated = await penCategoryModel.findByIdAndUpdate(_id, {
    $set: { root_folder_name: folder_name, file_name: file_name },
  });

  res.send({ message: udpated });
});

//   -------for pen ----------

xl.get("/insert-main-cat-folder-images-for-pens", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  //   let file_name = req.query.file_name
  let _id = req.query._id;

  const { master_folder_name } = await penCategoryModel.findById(_id);
  let folder_name = master_folder_name + "/" + req.query.folder_name;

  let udpated = await penCategoryModel.findByIdAndUpdate(_id, {
    $set: { product_folder_name: folder_name },
  });

  res.send({ message: udpated });
});

//   -------for pen ----------

//   -------except marker and pen  ----------
xl.get("/insert-main-cat-images-folder-for-all-products", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  //   let file_name = req.query.file_name
  let _id = req.query._id;
  const { master_folder_name } = await categoryProductModel.findById(_id);

  let folder_name = master_folder_name + "/" + req.query.folder_name;

  let udpated = await categoryProductModel.findByIdAndUpdate(_id, {
    $set: { product_folder_name: folder_name },
  });

  res.send({ message: udpated });
});

//   -------except marker and pen  ----------

// ------------------------for markers --------------------

xl.get("/insert-main-cat-images-folder-for-markers", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  //   let file_name = req.query.file_name
  let _id = req.query._id;
  const { master_folder_name } = await markerCateroyModel.findById(_id);

  let folder_name = master_folder_name + "/" + req.query.folder_name;

  let udpated = await markerCateroyModel.findByIdAndUpdate(_id, {
    $set: { product_folder_name: folder_name },
  });

  res.send({ message: udpated });
});

// ------------------------for markers --------------------

xl.get("/insert-cat-folder-images-for-markers", async (req, res) => {
  //   let folder_name = path.join(__dirname ,"../../assets/master_prd_icons/"+req.query.folder_name)
  let folder_name = "master_prd_icons/markers/" + req.query.folder_name;
  let file_name = req.query.file_name;
  let _id = req.query._id;

  console.log(folder_name, file_name, _id);

  let udpated = await markerCateroyModel.findByIdAndUpdate(_id, {
    $set: { root_folder_name: folder_name, file_name: file_name },
  });

  res.send({ message: udpated });
});

xl.post(
  "/insert-main-prduct-images",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, product_name, product_id } = req.body;
    //   console.log(req.file)

    let data = await categoryProductModel.findById(_cat_id);
    if (data != null) {
      const { product_folder_name } = data;

      let placed_file = req.file.destination + req.file.filename;
      let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

      let new_folder_path = path.join(
        __dirname,
        "../../assets/" + product_folder_name + "/"
      );
      let final_path = new_folder_path + file_name;

      fses.move(placed_file, final_path, function (err) {
        if (err) throw err;

        MainCatProductModel.findByIdAndUpdate(product_id, {
          $set: {
            product_root_folder_name: product_folder_name,
          },
          $push: { product_file_names: file_name },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }

    res.send({ message: "updated" });
  }
);

//   ----------for pen -------------------------
xl.post(
  "/insert-main-prduct-images",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, product_name, product_id } = req.body;
    //   console.log(req.file)

    let data = await categoryProductModel.findById(_cat_id);
    if (data != null) {
      const { product_folder_name } = data;

      let placed_file = req.file.destination + req.file.filename;
      let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

      let new_folder_path = path.join(
        __dirname,
        "../../assets/" + product_folder_name + "/"
      );
      let final_path = new_folder_path + file_name;

      fses.move(placed_file, final_path, function (err) {
        if (err) throw err;

        MainCatProductModel.findByIdAndUpdate(product_id, {
          $set: {
            product_root_folder_name: product_folder_name,
          },
          $push: { product_file_names: file_name },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }

    res.send({ message: "updated" });
  }
);

//career-api
xl.post("/send-career", upload.single("file"), async (req, res) => {
  //   console.log( req.body )
  const { name, email, contact, profile } = req.body;
  //   console.log(req.file)

  // const { product_folder_name } = data;

  let placed_file = req.file.destination + req.file.filename;
  let file_name = req.file.originalname.split(".")[0] + Date.now() + ".pdf";

  let new_folder_path = path.join(
    __dirname,
    "../../assets/" + "career-resume" + "/"
  );
  let final_path = new_folder_path + file_name;

  console.log("final-path->", final_path);

  fses.move(placed_file, final_path, function (err) {
    if (err) throw err;

    careerModel
      .create({
        name,
        email,
        contactNumber: contact,
        profile,
        resume_folder_name: "career-resume" + "/",
        file_name: file_name,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  res.send({ message: "Profile send sucessfully!" });
});

xl.get("/get-career-data/:pageSize/:pageNo", async (req, res) => {
  const { pageNo, pageSize } = req.params;

  const skipAmount = (pageNo - 1) * pageSize;
  const total_data_count = await careerModel.find({}).count();
  const data = await careerModel.find({}).skip(skipAmount).limit(pageSize);
  res.send({ data, total_data_count });
});
xl.get("/get-all-career-data/", async (req, res) => {
  const data = await careerModel.find({});
  res.send({ data });
});

//   ----------for pen -------------------------

xl.post("/insert-cat-products", upload.single("file"), async (req, res) => {
  //   console.log( req.body )
  const { _cat_id, product_name, product_id } = req.body;
  console.log(req.file);
  let data = await categoryProductModel.findById(_cat_id);
  if (data != null) {
    const { master_folder_name } = data;

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name + "/products/"
    );
    let final_path = new_folder_path + file_name;

    fses.move(placed_file, final_path, function (err) {
      if (err) throw err;

      console.log("Successfully renamed - AKA moved!");
      MainCatProductModel.findByIdAndUpdate(product_id, {
        $set: {
          root_folder_name: master_folder_name + "/products/",
          file_name: file_name,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  //   let folder_name = "master_prd_icons/"+req.query.folder_name
  //   let file_name = req.query.file_name
  //   let _id=  req.query._id

  //   console.log(folder_name , file_name , _id)

  //   let udpated = await categoryProductModel.findByIdAndUpdate(_id ,{$set :
  //    { master_folder_name:folder_name, file_name:file_name }
  // } ,     )

  res.send({ message: "updated" });
});

//colorpicker color_variants image
xl.post(
  "/insert-cat-products-color-variants-for-pen",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, product_name, product_id, label, hexcode } = req.body;
    console.log("data-->", _cat_id, product_id);
    let data;
    let master_folder_name;
    data = await penCategoryModel.findById(_cat_id);

    if (data) {
      master_folder_name = data.master_folder_name;
    } else {
      data = await categoryProductModel.findById(_cat_id);
      if (data != null) {
        master_folder_name = data.product_folder_name;
      }
    }

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name + "/products" + "/color_variants/"
    );
    let final_path = new_folder_path + file_name;

    const color_variant_data = {
      id: Math.floor(Math.random() * Date.now()).toString(16),
      label,
      hexcode,
      root_folder_name: master_folder_name + "/products" + "/color_variants/",
      file_name,
    };

    fses.move(placed_file, final_path, async function (err) {
      if (err) throw err;

      // let model_data;
      // model_data = await penCategoryModel.findById(_cat_id);
      // if (model_data != null) {
      return Products.findByIdAndUpdate(product_id, {
        // $set: {
        //   root_folder_name: master_folder_name + "/products/",
        //   file_name: file_name,
        // },
        $push: {
          color_variant: color_variant_data,
        },
      })
        .then((response) => {
          console.log(" Successfully renamed - AKA moved! ", response);
          return "pen added ", response;
        })
        .catch((error) => {
          console.log(error);
        });

      return;
      // }

      // model_data = await markerCateroyModel.findById(_cat_id);

      // if (model_data != null) {
      //   return Makers.findByIdAndUpdate(product_id, {
      //     $set: {
      //       root_folder_name:
      //         master_folder_name + "/products" + "/color_variants/",
      //       file_name: file_name,
      //     },
      //   })
      //     .then((response) => {
      //       return "marker added ", response;
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });

      //   return;
      // }

      // MainCatProductModel.findByIdAndUpdate(product_id, {
      //   $set: {
      //     root_folder_name:
      //       master_folder_name + "/products" + "/color_variants/",
      //     file_name: file_name,
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    });

    res.send({ message: "updated" });
  }
);

//add-other images
xl.post(
  "/insert-cat-products-other-images",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, isOtherImage, product_id } = req.body;
    console.log("data-->", _cat_id, product_id);
    let data;
    let master_folder_name;
    data = await penCategoryModel.findById(_cat_id);

    if (data) {
      master_folder_name = data.master_folder_name;
    } else {
      data = await categoryProductModel.findById(_cat_id);
      if (data != null) {
        master_folder_name = data.product_folder_name;
      }
    }

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name + "/products" + "/other_images/"
    );
    let final_path = new_folder_path + file_name;

    const color_variant_data = {
      id: Math.floor(Math.random() * Date.now()).toString(16),
      root_folder_name: master_folder_name + "/products" + "/other_images/",
      file_name,
      isOtherImage,
    };

    fses.move(placed_file, final_path, async function (err) {
      if (err) throw err;

      // let model_data;
      // model_data = await penCategoryModel.findById(_cat_id);
      // if (model_data != null) {
      return Products.findByIdAndUpdate(product_id, {
        // $set: {
        //   root_folder_name: master_folder_name + "/products/",
        //   file_name: file_name,
        // },
        $push: {
          color_variant: color_variant_data,
        },
      })
        .then((response) => {
          console.log(" Successfully renamed - AKA moved! ", response);
          return "pen added ", response;
        })
        .catch((error) => {
          console.log(error);
        });

      return;
      // }

      // model_data = await markerCateroyModel.findById(_cat_id);

      // if (model_data != null) {
      //   return Makers.findByIdAndUpdate(product_id, {
      //     $set: {
      //       root_folder_name:
      //         master_folder_name + "/products" + "/color_variants/",
      //       file_name: file_name,
      //     },
      //   })
      //     .then((response) => {
      //       return "marker added ", response;
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });

      //   return;
      // }

      // MainCatProductModel.findByIdAndUpdate(product_id, {
      //   $set: {
      //     root_folder_name:
      //       master_folder_name + "/products" + "/color_variants/",
      //     file_name: file_name,
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    });

    res.send({ message: "updated" });
  }
);

xl.post(
  "/insert-cat-products-for-pen",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, product_name, product_id } = req.body;
    console.log("data-->", _cat_id, product_id);
    let data;
    let master_folder_name;
    data = await penCategoryModel.findById(_cat_id);
    let hasSubCategory;

    if (data) {
      hasSubCategory = true;
      master_folder_name = data.master_folder_name;
    } else {
      data = await categoryProductModel.findById(_cat_id);
      if (data != null) {
        master_folder_name = data.product_folder_name;
      }
    }

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name + "/products/"
    );
    let final_path = new_folder_path + file_name;

    fses.move(placed_file, final_path, async function (err) {
      if (err) throw err;

      let model_data;
      // if (hasSubCategory) {
      //  model_data = await penCategoryModel.findById(_cat_id);
      //  if (model_data != null) {
      return Products.findByIdAndUpdate(product_id, {
        $set: {
          root_folder_name: master_folder_name + "/products/",
          file_name: file_name,
        },
      })
        .then((response) => {
          console.log(" Successfully renamed - AKA moved! ", response);
          return "pen added ", response;
        })
        .catch((error) => {
          console.log(error);
        });
      //   }
      //  }
    });

    /*   model_data = await markerCateroyModel.findById(_cat_id);

      if (model_data != null) {
        return Makers.findByIdAndUpdate(product_id, {
          $set: {
            root_folder_name: master_folder_name + "/products/",
            file_name: file_name,
          },
        })
          .then((response) => {
            return "marker added ", response;
          })
          .catch((error) => {
            console.log(error);
          });

        return;
      }
 */

    res.send({ message: "updated" });
  }
);

xl.post(
  "/insert-master-cat-products-for-pen",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, product_name, product_id } = req.body;

    let data;
    data = await penCategoryModel.findById(_cat_id);
    const { master_folder_name } = data;

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name + "/products/"
    );
    let final_path = new_folder_path + file_name;

    fses.move(placed_file, final_path, async function (err) {
      if (err) throw err;

      let model_data;
      model_data = await penCategoryModel.findById(_cat_id);
      if (model_data != null) {
        return Products.findByIdAndUpdate(product_id, {
          $set: {
            root_folder_name: master_folder_name + "/products/",
            file_name: file_name,
          },
        })
          .then((response) => {
            console.log(" Successfully renamed - AKA moved! ", response);
            return "pen added ", response;
          })
          .catch((error) => {
            console.log(error);
          });

        return;
      }

      model_data = await markerCateroyModel.findById(_cat_id);

      if (model_data != null) {
        return Makers.findByIdAndUpdate(product_id, {
          $set: {
            root_folder_name: master_folder_name + "/products/",
            file_name: file_name,
          },
        })
          .then((response) => {
            return "marker added ", response;
          })
          .catch((error) => {
            console.log(error);
          });

        return;
      }

      MainCatProductModel.findByIdAndUpdate(product_id, {
        $set: {
          root_folder_name: master_folder_name + "/products/",
          file_name: file_name,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    res.send({ message: "updated" });
  }
);

xl.post(
  "/insert-cat-products-for-marker",
  upload.single("file"),
  async (req, res) => {
    //   console.log( req.body )
    const { _cat_id, product_name, product_id } = req.body;
    console.log(req.file);
    const { master_folder_name } = await markerCateroyModel.findById(_cat_id);

    let placed_file = req.file.destination + req.file.filename;
    let file_name = req.file.originalname.split(".")[0] + Date.now() + ".jpg";

    let new_folder_path = path.join(
      __dirname,
      "../../assets/" + master_folder_name + "/products/"
    );
    let final_path = new_folder_path + file_name;

    fses.move(placed_file, final_path, function (err) {
      if (err) throw err;

      console.log("Successfully renamed - AKA moved!");
      Makers.findByIdAndUpdate(product_id, {
        $set: {
          root_folder_name: master_folder_name + "/products/",
          file_name: file_name,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    res.send({ message: "updated" });
  }
);

export default xl;
