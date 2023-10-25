import mongoose, { Schema } from "mongoose";
import collection from './../collection/collection.js'
 
let productCategorySchema  = new Schema({
     
    category:{
     type:String , 
     required:true     
     },
     color:String ,  
     created_on: {
         type: Date ,
         default:()=>  new Date() , 
     }
      
})



let productSchema  = new Schema({
      category_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: collection.rg_global_master_category
       } ,
      name:String,
      color:String ,
     description:String ,
     icon:String ,
     did_you_know:String ,  
     created_on: {
         type: Date ,
         default:()=>  new Date() , 
     }

})




let heighlighterSchema  = new Schema({
    name:String,
    color:String ,
   description:String ,
   icon:String ,
   did_you_know:String ,  
   created_on: {
       type: Date ,
       default:()=>  new Date() , 
   }

})



let categoryProductSchema  = new Schema({
    name:String,
    color:String ,
   created_on: {
       type: Date ,
       default:()=>  new Date() , 
   }

})

 
 

let ProductsCategory = mongoose.model(collection.rg_global_master_category ,productCategorySchema )
let Products = mongoose.model(collection.rg_global_master_product ,productSchema )
let heighlighter = mongoose.model(collection.rg_global_master_heighlighter ,heighlighterSchema )
let category_product = mongoose.model(collection.rg_global_master_category_product ,categoryProductSchema )

export  {ProductsCategory , Products ,heighlighter ,category_product  }