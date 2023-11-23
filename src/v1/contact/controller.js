// import { ContactModel } from "../../models/products";

import { categoryProductModel } from "../../models/common.js";
import {
  MainCatProductModel,
  Makers,
  Products,
  markerCateroyModel,
  penCategoryModel,
  ContactModel,
} from "./../../models/products.js";

export async function getContactList() {
  try {
    let get_all_contacts = await ContactModel.find({});
    return Promise.resolve(get_all_contacts);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
export async function submitContact(data) {
  try {
    let submittedContact = await ContactModel.create(data);
    return Promise.resolve(submittedContact);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
