import { categoryProductModel } from '../../models/common.js'
import { MainCatProductModel , Products, markerCateroyModel, penCategoryModel } from './../../models/products.js'


// ---------------------addc cat -------------------


// export async function addProductCategory(prd_cat_object) {     
//        try {       
//         let  new_prd =await product_ctg_model(prd_cat_object)
//         await new_prd.save()
//         return Promise.resolve(new_prd)
//      }
//      catch(err ) {
//          return Promise.reject(err.message)
//      }
// }

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
            if(all_cat_products.length>0) {
                var ctg_with_sub_cat = await Promise.all(all_cat_products.map(async (ele)=>{
                    if(ele.name=="Pens"){
                       let sub_mene_val = await penCategoryModel.find()                        
                        return {...ele ,sub_menu: sub_mene_val }
                    } else if(ele.name=="Markers"){
                      let sub_mene_val = await markerCateroyModel.find()                        
                        return {...ele ,sub_menu:sub_mene_val }
                    }else{
                        return ele                  
                    }

                })) 


                return Promise.resolve(ctg_with_sub_cat)
            }
        
            return Promise.resolve([])

    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}


// ------------get all category -------------------------









// ------------get all category -------------------------
export async function getAllCatWiseProducts(_id) {
     
    try{
           
       let  cat_wise_products =await MainCatProductModel.find({product_cat_type:_id}).populate("product_cat_type")
       
        console.log(cat_wise_products.length)
       return Promise.resolve(cat_wise_products)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}

