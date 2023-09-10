import mongoose from "mongoose";
import collection from './../collections.js'
import { floor_types_model as floor_types_schema ,feature_types_model as feature_types_schema  } from "./common_models.js";
import { category_detail as categorySchema ,  } from "./owner.js"; 

 
 let propery_details_schema = new  mongoose.Schema({
     property_type:{
        type:categorySchema
    } ,
    floor_types:{
         type:floor_types_schema 
    } , 
    no_of_bedrooms:Number ,
    no_of_bathroom:Number ,
    Built_up_area:String,
    feature:{
          type:feature_types_schema
    }  ,

    

    

})
 

let rg_global_master_property_detail = mongoose.model(collection.rg_global_master_property_detail ,propery_details_schema  ) 

export default rg_global_master_property_detail