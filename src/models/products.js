import mongoose, { Schema } from "mongoose";
import collection from './../collection/collection.js'
 

let productSchema  = new Schema({
     
    type:{
     type:String , 
     required:true     
     },
     color:String ,  
     created_on: {
         type: Date ,
         default:()=>  new Date() , 
     }

})
 

let Products = mongoose.model(collection.rg_global_master_product ,productSchema )
 
export  {Products}