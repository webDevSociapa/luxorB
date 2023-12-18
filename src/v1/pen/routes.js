import express from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import {
  delete_pen_category,
  getPenByCategory,
  get_all_pen_category,
} from "./controller.js";
let pen = express.Router();

//get sub-categories new
pen.get("/get-pen-category", (req, res) => {
  get_all_pen_category()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});
//delete sub-categories new
pen.delete("/delete-pen-category/:id", (req, res) => {
  const { id } = req.params;
  delete_pen_category(id)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

pen.get("/get-pen-by-category", (req, res) => {
  let _id = req.query.pen_ctg_id;
  getPenByCategory(_id)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

export default pen;
