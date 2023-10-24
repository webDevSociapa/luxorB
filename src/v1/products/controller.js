import {ProductsCategory as product_ctg_model , Products } from './../../models/products.js'






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
export async function getAllProducts() {
     
    try{

       let  prdtcs =await product_ctg_model.find({})
       return Promise.resolve(prdtcs)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}


// ------------get all category -------------------------
