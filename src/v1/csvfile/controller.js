import { csvFileModel } from "../../models/csvfile.js";

export async function getAllCSVFiles() {
  try {
    let get_csv_files = await csvFileModel.find({});
    return Promise.resolve(get_csv_files);
  } catch (err) {
    return Promise.reject(err.message);
  }
}
