import mongoose, { Schema } from "mongoose";
import collection from './../collections.js'
 
let categorySchema = new Schema({
     pg_hostel:Boolean ,
     flats_apartment:Boolean,
     residential_house:Boolean 
}) 

let ownerSchema = new  mongoose.Schema({
     boys:Boolean ,
     girls:Boolean,
     any:String ,
     first_name:{
        type:String ,
        required:true
    } ,
    last_name:{
       type:String ,
       required:true
   } ,
    email:{
        type:String ,
        required:true 
    } , 
    phone:{
        type:Number ,
        required:true 
    } , 
    
    property_type:{
        type:categorySchema
    } ,

    password:{
        type:String ,
        required:true
    } ,
    created_on:{
        type:Date ,
         default:()=> new Date()
    } ,
     
    updated_on:{
        type:Date ,    
    }

})
 

let ownerModel = mongoose.model(collection.rg_global_master_owner_detail ,ownerSchema  ) 

export default ownerModel