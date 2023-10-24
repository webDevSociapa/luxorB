import  express  from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import { addProductCategory, getAllProducts , addProduct  } from "./controller.js";
let prd = express.Router()

prd.post('/add-prd-category' , (req, res )=>{
      let model = {}
      model.category = req.body.category
      model.color = req.body.color
     
     for(const key in model ) {
     if(model[key]=="") { 
         return  res.send(fail_service_response({message:`please fill ${key}`}))
        }
     }
             
     addProductCategory(model).then((result)=>{           
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })

})





prd.post('/add-prd' , (req, res )=>{
 
     
    let model = {}
     
     for(let [key,value] of  Object.entries(req.body)  ) { 
            if(["name" ,"description"].includes(key))          
                    model[key] = value       
      }

   for(const key in model ) {
   if(model[key]=="") { 
       return  res.send(fail_service_response({message:`please fill ${key}`}))
      }
   }
      
   addProduct(req.body).then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    

})





 
prd.get('/get-prd-category' , (req, res )=>{
 
    getAllProducts().then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    
})









export default  prd