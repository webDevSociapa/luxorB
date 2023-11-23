import express from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import { getContactList, submitContact } from "./controller.js";
let contact_router = express.Router();

contact_router.get("/contact-list", (req, res) => {
  getContactList()
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
