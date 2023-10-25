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





let productWithProductCategory  = new Schema({
    product_cat_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: collection.rg_global_master_category_product 
        },
    name:String,
    description:String ,
    icon:String ,
    did_you_know:String ,  
    color:String ,
   created_on: {
       type: Date ,
       default:()=>  new Date() , 
   }
})



let ProductsCategory = mongoose.model(collection.rg_global_master_category ,productCategorySchema )
let Products = mongoose.model(collection.rg_global_master_product ,productSchema )
let heighlighter = mongoose.model(collection.rg_global_master_heighlighter ,heighlighterSchema )
let MainCatProductModel = mongoose.model(collection.rg_global_master_main_cat_wise_product ,productWithProductCategory )

export  {ProductsCategory , Products ,heighlighter ,MainCatProductModel   }