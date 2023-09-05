import  express  from "express";
import tenant_model from './../../../models/tenant.js'
let tenant_router = express.Router()


tenant_router.post('/signup' , (req, res )=>{
     let model = { first_name:"something " , last_name:" l name " ,password:"idk    "  }
    let d =new tenant_model(model)
    d.save().then((()=> console.log("saved ")))
   
    res.send({
         message:"signu up  "
    })
     
})

 
tenant_router.post('/login' , (req, res )=>{
     
    res.send({
         message:"login "
    })
     
})


export default  tenant_router