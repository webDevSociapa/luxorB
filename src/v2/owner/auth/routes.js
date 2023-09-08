import  express  from "express";

import { fail_service_response, succes_service_response } from "../../../utils.js";
import { newOwnerLogin, newOwnerSignup } from "./controller.js";
let owner_router = express.Router()

owner_router.post('/signup' , (req, res )=>{
     let model = { }
    //  ----basic details ----
      model.first_name = req.body.first_name
      model.last_name = req.body.last_name
      model.email = req.body.email
      model.phone = req.body.phone
    
    //  ----basic details ----
      
      model.boys = req.body.boys
      model.girls = req.body.girls
      model.any = req.body.any
      
      model.property_type = { pg_hostel:req.body.property_type.pg_hostel , flats_apartment:req.body.property_type.flats_apartment , residential_house:req.body.property_type.residential_house  }
   
      model.password = req.body.password
  
     const filtered_model =  {first_name:model.first_name , email:model.email, last_name:model.last_name , password:model.password}  
    for(const key in filtered_model ) {
     if(model[key]=="") { 
         return  res.send(fail_service_response({message:`please fill ${key}`}))
        }
     }
             
     newOwnerSignup(model).then((result)=>{           
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })

})

 
owner_router.post('/login' , (req, res )=>{
 
     
     let model = { }
     model.email = req.body.email
     model.password = req.body.password

    for(const key in model ) {
       if(model[key]=="") { 
          return  res.send(fail_service_response({message:`please fill ${key}`}))
       }
    }

       
    newOwnerLogin(model).then((result)=>{ 
                 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    

})


export default  owner_router