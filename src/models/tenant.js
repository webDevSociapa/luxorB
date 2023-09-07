import mongoose from "mongoose";
 import collection from './../collections.js'
 
let tenantSchema = new  mongoose.Schema({
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
 

let tenantModel = mongoose.model(collection.rg_global_master_tenant_detail ,tenantSchema  ) 

export default tenantModel