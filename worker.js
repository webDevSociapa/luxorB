import { parentPort } from "worker_threads";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { csvFileModel } from "./src/models/csvfile.js";
import { initDb } from "./src/connection/connect.js";
import { careerCSVModel } from "./src/models/careerCSV.js";

console.log("worker.js");
//res, mailOptions, email, message

// const sendCsvEmail = async (a, b, transporter) => {
//   console.log("above send mail");
//   const info = await transporter.sendMail({
//     from: '"Abhishek 👻Abhi@gmail.com>', // sender address
//     to: "abhishekkumarsingh20012000@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   // point to the template folder

//   // use a template file with nodemailer

//   console.log("Message sent: %s", info.messageId);
// };

parentPort.on("message", async (message) => {
  console.log("inside worker function");
  if (message.type === "start") {
    initDb();

    // Your heavy computation (for loop) goes here
    // const csvRows = [];

    if (message.sectionName === "career") {
      console.log("inside career");
      console.log("career-data-->", message.data);
      const resArr = message.data.map((item, index) => {
        return {
          Sno: index + 1,
          // databaseId: item._id,
          // id: `LUXC${item._id.slice(-5)}`,
          Name: item._doc.name,
          Email: item._doc.email,
          Contact: item._doc.contactNumber,
          Profile: item._doc.profile,
          Resume: item._doc.file_name,
          Submitted: item._doc.created_on,
        };
      });

      console.log("resArr->", resArr);

      // Specify the CSV file path
      const rootDirectory = process.cwd();

      const folderName = "exported_csv";

      // Create the full path to the folder
      const folderPath = path.join(rootDirectory + "/" + "assets", folderName);

      // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // Specify the CSV file path in the root directory
      const fileName = `carrer_data-${Date.now()}.csv`;
      const csvFilePath = path.join(folderPath, fileName);
      const dbPath = folderName + "/" + fileName;

      console.log(csvFilePath);

      // Create a CSV header line
      // const header1 = Object.keys(data[0]).join(",");
      const header1 = Object.keys(resArr[0]).join(",");

      // Create a CSV content string
      const csvContent = `${header1}\n${resArr
        .map((row) => Object.values(row).join(","))
        .join("\n")}`;

      // Write data to the CSV file
      try {
        await careerCSVModel.create({
          name: fileName,
          path: dbPath,
        });
        await fs.promises.writeFile(csvFilePath, csvContent, "utf8");
        console.log("file written!");
      } catch (err) {
        console.log("error-->", err);
      }
    } else {
      const resArr = message.data.map((item, index) => {
        return {
          sno: index + 1,
          // databaseId: item._id,
          // id: `LUXC${item._id.slice(-5)}`,
          name: item._doc.name,
          mobileNumber: item._doc.contactNumber,
          email: item._doc.email,
          requirements: item._doc.requirements,
          companyName: item._doc.companyName,
        };
      });

      console.log("resArr->", resArr);

      // Specify the CSV file path
      const rootDirectory = process.cwd();

      const folderName = "exported_csv";

      // Create the full path to the folder
      const folderPath = path.join(rootDirectory + "/" + "assets", folderName);

      // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      // Specify the CSV file path in the root directory
      const fileName = `data-${Date.now()}.csv`;
      const csvFilePath = path.join(folderPath, fileName);
      const dbPath = folderName + "/" + fileName;

      console.log(csvFilePath);

      // Create a CSV header line
      // const header1 = Object.keys(data[0]).join(",");
      const header1 = Object.keys(resArr[0]).join(",");

      // Create a CSV content string
      const csvContent = `${header1}\n${resArr
        .map((row) => Object.values(row).join(","))
        .join("\n")}`;

      // Write data to the CSV file
      try {
        await csvFileModel.create({
          name: fileName,
          path: dbPath,
        });
        await fs.promises.writeFile(csvFilePath, csvContent, "utf8");
        console.log("file written!");
      } catch (err) {
        console.log("error-->", err);
      }
    }

    // Send a message back to the main thread when the computation is done
    parentPort.postMessage("done");
  }
});
