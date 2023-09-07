export function succes_service_response(result) {

    return {
         status:true ,
         error:null ,
         response_code:200, 
         result
    }
    
}


 
export function fail_service_response(err) {

    return {  
          status:false ,
          error:err ,
          response_code:500,
          result:null    
    }
    
}


export function validateFields(model) {
 
     let validated = true 
    for(const key in model ) {
        if(model[key]=="") {
            validated=false  
              break 
           }
        }
         
         if(validated==false ) 
          return  { validated  , key }
        else 
        return  { validated   }
         
}