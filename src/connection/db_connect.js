import mongoose from "mongoose";
import config from "../config.js";

export async function initDb(){

     mongoose.connect(config.db_url).then(res=>{
            console.log("connectd to db " )
     }).catch(err=>{
         console.log("some error occured " , err )
     }).finally(()=>{
         console.log("connection attempt succesfull ")
     })
      
     return

} 