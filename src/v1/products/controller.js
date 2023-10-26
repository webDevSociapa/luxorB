import { categoryProductModel } from '../../models/common.js'
import {MainCatProductModel, ProductsCategory as product_ctg_model , Products } from './../../models/products.js'




// ---------------------addc cat -------------------
export async function addProductCategory(prd_cat_object) {
     
     try{
       
        let  new_prd =await product_ctg_model(prd_cat_object)
        await new_prd.save()
        return Promise.resolve(new_prd)
     }
     catch(err ) {
         return Promise.reject(err.message)
     }
}

// ---------------------addc cat -------------------


















// ---------------------add prd ----------------------------




export async function addProduct(prd_object) {
     
    try{
           
       let  new_prd =await Products(prd_object)
       await new_prd.save()
       return Promise.resolve(new_prd)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}


// ---------------------add prd ----------------------------



















// ------------get all category -------------------------
export async function getAllProductsCategory() {
     
    try{
        
       let  all_cat_products =await categoryProductModel.find({})
       return Promise.resolve(all_cat_products)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}


// ------------get all category -------------------------









// ------------get all category -------------------------
export async function getAllCatWiseProducts(_id) {
     
    try{
           
       let  cat_wise_products =await MainCatProductModel.find({product_cat_type:_id })
       console.log(cat_wise_products)
       return Promise.resolve(cat_wise_products)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}

