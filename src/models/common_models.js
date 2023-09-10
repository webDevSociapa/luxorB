import mongoose, { Schema } from "mongoose";
import collection from './../collections.js'
 
let bhk_types_schema = new Schema({
     one_bhk:Boolean ,
     two_bhk:Boolean,
     three_bhk:Boolean 
}) 


 
let floor_types_schema = new Schema({
    ground_foor:Boolean ,
    first_floor:Boolean,
    second_floor:Boolean 
}) 


 
let fetures_types_schema = new Schema({
    ac_room:Boolean ,
    ac_single_bed:Boolean,
    non_ac_room:Boolean 

 }) 


let bhk_types_model = mongoose.model(collection.common_model_schema.rg_global_master_bhk_type ,bhk_types_schema )
let floor_types_model = mongoose.model(collection.common_model_schema.rg_global_master_bhk_type ,floor_types_schema )
let feature_types_model = mongoose.model(collection.common_model_schema.rg_global_master_feature_type ,fetures_types_schema )
 
export  {bhk_types_model , floor_types_model ,feature_types_model }