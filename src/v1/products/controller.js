import {Products as product_model} from './../../models/products.js'

export async function addProduct(prd_object) {
     
     try{

        let  new_prd =await product_model(prd_object)
        await new_prd.save()
        return Promise.resolve(new_prd)
     }
     catch(err ) {
         return Promise.reject(err.message)
     }
}


export async function getAllProducts() {
     
    try{

       let  prdtcs =await product_model.find({})
       return Promise.resolve(prdtcs)
    }
    catch(err ) {
        return Promise.reject(err.message)
    }
}
