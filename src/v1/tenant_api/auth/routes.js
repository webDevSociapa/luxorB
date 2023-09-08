import  express  from "express";
import tenant_model from './../../../models/tenant.js'
import { newTenantLogin, newTenantSignup } from "./controller.js";
import { fail_service_response, succes_service_response, validateFields } from "../../../utils.js";
let tenant_router = express.Router()

tenant_router.post('/signup' , (req, res )=>{
     let model = { }
      model.first_name = req.body.first_name
      model.last_name = req.body.last_name
      model.email = req.body.email
      model.password = req.body.password
    

    for(const key in model ) {
     if(model[key]=="") { 
        return  res.send(fail_service_response({message:`please fill ${key}`}))
      }
     }
     

      newTenantSignup(model).then((result)=>{
          
             res.send(succes_service_response(result)) 
   
          }).catch(err=>{
             res.send(fail_service_response(err)) 
         })
          
  
})

 
tenant_router.post('/login' , (req, res )=>{
 
     
     
     let model = { }
     model.email = req.body.email
     model.password = req.body.password

    for(const key in model ) {
       if(model[key]=="") { 
          return  res.send(fail_service_response({message:`please fill ${key}`}))
       }
    }
       
     newTenantLogin(model).then((result)=>{           
           res.send(succes_service_response(result)) 

       }).catch(err=>{
          res.send(fail_service_response(err)) 
      })
       

})


export default  tenant_router