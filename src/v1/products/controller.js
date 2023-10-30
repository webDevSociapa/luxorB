import { categoryProductModel } from '../../models/common.js'
import { MainCatProductModel , Makers, Products, markerCateroyModel, penCategoryModel } from './../../models/products.js'


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


export async function getAllCatWiseProducts(_id , cat_type) {
     
    try{


         let prd_names = await categoryProductModel.findById(_id)
        //  console.log(prd_names , cat_type )
         
          if(prd_names==null) {
             
         if( cat_type.trim()=="metal pens" || cat_type.trim()=="everyday writing" ) {
            let cat_wise_products =await Products.find({category_type:_id}).populate("category_type")       
            return Promise.resolve(cat_wise_products) 

         }else if(cat_type.trim()=="Permanent Markers" || cat_type.trim()=="WHITEBOARD MARKERS" || cat_type.trim()=="Whiteboard Care Kits"){
            let cat_wise_products =await Makers.find({marker_category_type:_id}).populate("marker_category_type")       
            return  Promise.resolve(cat_wise_products)
         }
 
         }else{
            let  cat_wise_products =await MainCatProductModel.find({product_cat_type:_id}).populate("product_cat_type")       
            return Promise.resolve(cat_wise_products)   
         }

           
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}



export  async function getProductByOnlyId({selected_prd , prd_id}) {
     
try {
    
     
    let find_final_cat =""
    let master_cat_id = prd_id
     
    let all_prd_cat= await categoryProductModel.find({}).select('name')
    let all_pen_cat  = await penCategoryModel.find({}).select('category')
    let all_marker_cat  = await markerCateroyModel.find({}).select('marker_category')
     
      const { _id: product_id , category:selected_category }  = selected_prd
      
       find_final_cat = all_prd_cat.find(ele=> ele._id==master_cat_id ) 
      if(find_final_cat!=null) {
         let main_prd = await MainCatProductModel.findById(product_id)
         return Promise.resolve(main_prd)
       }       

       find_final_cat = all_pen_cat.find(ele=> ele._id==master_cat_id ) 
        if(find_final_cat!=null) {
            let pen_prd = await Products.findById(product_id)
            return Promise.resolve(pen_prd)
        }      

       find_final_cat = all_marker_cat.find(ele=> ele._id==master_cat_id ) 
    
       if(find_final_cat!=null) {
           let marker_prd = await Makers.findById(product_id)       
            return Promise.resolve(marker_prd) 
        }      

    return Promise.resolve(true)
 } catch(err) {       
    return Promise.reject(err.message)

        }


}