import express from "express";
import { getAllCSVFiles } from "./controller.js";
import { fail_service_response, succes_service_response } from "../../util.js";

let csvfile_router = express.Router();

csvfile_router.get("/csv-files", (req, res) => {
  getAllCSVFiles()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

export default csvfile_router;
