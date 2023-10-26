import  express  from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import { addProductCategory , addProduct, getAllProductsCategory, getAllCatWiseProducts  } from "./controller.js";
let prd = express.Router()

 
prd.get('/get-all-products-category' , (req, res )=>{

    getAllProductsCategory().then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    
})


prd.get('/get-cate-wise-products' , (req, res )=>{

     let cat_id  = req.query._id

     getAllCatWiseProducts(cat_id).then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    
})







export default  prd