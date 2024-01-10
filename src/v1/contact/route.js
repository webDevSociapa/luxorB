import express from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import {
  getContactList,
  getContactListAll,
  submitContact,
} from "./controller.js";
let contact_router = express.Router();

contact_router.get("/contact-list/:pageSize/:pageNo", (req, res) => {
  const { pageSize, pageNo } = req.params;
  getContactList(pageNo, pageSize)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});
contact_router.get("/contact-list-all/", (req, res) => {
  getContactListAll()
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

contact_router.get("/test", (req, res) => {
  res.send(201).json("hello");
});

contact_router.post("/submit-contact", (req, res) => {
  const { name, email, contactNumber, companyName, requirements } = req.body;

  console.log("req body-->", req.body);

  const data = {
    name,
    email,
    contactNumber,
    companyName,
    requirements,
  };
  submitContact(data)
    .then((result) => {
      res.send(succes_service_response(result));
    })
    .catch((err) => {
      res.send(fail_service_response(err));
    });
});

export default contact_router;
