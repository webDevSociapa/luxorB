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

// export async function getContactList() {
//   try {
//     let get_all_contacts = await ContactModel.find({});
//     return Promise.resolve(get_all_contacts);
//   } catch (err) {
//     return Promise.reject(err.message);
//   }
// }
export async function getContactList(pageNo, pageSize) {
  try {
    const skipAmount = (pageNo - 1) * pageSize;
    let total_data_count = await ContactModel.find({}).count();

    let get_contacts_paginated = await ContactModel.find({})
      .skip(skipAmount)
      .limit(pageSize);
    return Promise.resolve({ get_contacts_paginated, total_data_count });
  } catch (err) {
    return Promise.reject(err.message);
  }
}
export async function getContactListAll() {
  try {
    let get_contacts = await ContactModel.find({});
    return Promise.resolve(get_contacts);
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
