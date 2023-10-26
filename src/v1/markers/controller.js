import { categoryProductModel } from '../../models/common.js'
import { MainCatProductModel , Makers, Products, markerCateroyModel } from './../../models/products.js'
















// ------------ get all marker category  -------------------------
export async function getAllMarkerCategory(_id) {
     
    try{
           
       let  get_all_marker_cat =await markerCateroyModel.find({})  
       return Promise.resolve(get_all_marker_cat)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}







export async function getCatWiseMarker(_id) {
     
    try{
           
       let  get_all_marker_cat =await Makers.find({marker_category_type:_id}).populate('marker_category_type')  
       return Promise.resolve(get_all_marker_cat)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}

