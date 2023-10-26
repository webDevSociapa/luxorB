import  express  from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import { get_all_pen_category  } from "./controller.js";
let pen = express.Router()



pen.get('/get-pen-category' , (req, res )=>{
 
    get_all_pen_category().then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    
})



export default  pen