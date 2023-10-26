import  express  from "express";

import { fail_service_response, succes_service_response } from "../../util.js";
import {getAllMarkerCategory, getCatWiseMarker  } from "./controller.js";
let marker_router = express.Router()

 
marker_router.get('/get-all-marker-category' , (req, res )=>{
     
    getAllMarkerCategory().then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    
})




marker_router.get('/cat-wise-marker' , (req, res )=>{
     
    let _id   = req.query.marker_cat_id
    getCatWiseMarker(_id).then((result)=>{ 
        res.send(succes_service_response(result)) 

    }).catch(err=>{
       res.send(fail_service_response(err)) 
   })
    
})




export default  marker_router