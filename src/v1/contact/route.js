import express from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import { Worker, isMainThread, parentPort } from "worker_threads";

import {
  exportAllContacts,
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
contact_router.get("/export-all-contact-list/", (req, res) => {
  res.send(
    succes_service_response(
      "The file will be available in the 'Download Icon' section soon."
    )
  );
  exportAllContacts()
    .then((result) => {
      const worker = new Worker("./worker.js");

      // Listen for messages from the web worker
      worker.on("message", (message) => {
        if (message === "done") {
          // This will be executed when the web worker finishes its computation
          console.log("Web worker finished");
          worker.terminate();
        }
      });

      // Start the web worker
      worker.postMessage({
        type: "start",
        data: result,
        sectionName: "contact",
      });
    })
    .catch((err) => {
      console.log("error-->", err);
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
