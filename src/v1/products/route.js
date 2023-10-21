import  express  from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import { addProduct, getAllProducts } from "./controller.js";
let prd = express.Router()

prd.post('/add-product' , (req, res )=>{
      let model = {}
      model.type = req.body.type
      model.color = req.body.color
     
     for(const key in model ) {
     if(model[key]=="") { 
         return  res.send(fail_service_response({message:`please fill ${key}`}))
        }
     }
             
     addProduct(model).then((result)=>{           
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })

})

 
prd.get('/get-products' , (req, res )=>{
 
    
    getAllProducts().then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    

})


export default  prd