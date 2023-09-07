import tenantModel from "../../../models/tenant.js"
import bcrypt from 'bcrypt'
import { fail_service_response } from "../../../utils.js"
import jwt from 'jsonwebtoken'


 export async function newTenantSignup(model) {
    try{    
        const {  first_name ,  last_name ,  email , password  } =  model 
           let temp_user = await tenantModel.find({email:email})
           if(temp_user.length>0 ) {
                 return Promise.resolve("user already registered")
            }else{
                    let has_pass = await bcrypt.hash(password , 5  )
                    let new_user =new tenantModel({ first_name ,  last_name ,  email , password:has_pass })
                     await new_user.save()
                     return Promise.resolve(new_user)       
                }
        
    }catch(err) {
        
        return Promise.reject(err)
         
    }
     
}




export async function newTenantLogin(model) {
    try{    
      
        const {    email , password  } =  model 
          let temp_user = await tenantModel.findOne({email:email})
          if( temp_user==null) {
             return Promise.resolve({message:" please resigter first  "})
           } else {
                const { _id, first_name, last_name, email , password:hasspass } = temp_user
                  
                    let isMathc=await bcrypt.compare(password , hasspass)
                     if(isMathc) {
                        let token =  jwt.sign({ _id }, process.env.TENANT_PRIVATE_KEY )
                        return Promise.resolve({ first_name, last_name, email , token  }) 
                     }else{
                         return Promise.reject("invalid credentials")
                     }
                   
                }
        
    }catch(err) {
        
        return Promise.reject(err)
         
    }
     
}