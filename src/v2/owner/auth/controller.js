import ownerModel from "../../../models/owner.js"
import bcrypt from 'bcrypt'

export async function newOwnerSignup(model) {
    try{    
        const {  first_name, last_name, email, phone, boys, girls, any, property_type, password,  } =  model 
           
        let temp_user = await ownerModel.findOne({email})
           if(temp_user!=null ) {
                 return Promise.resolve("owner already registered")
            }else{

                    let has_pass = await bcrypt.hash(password , 5  )
                    let new_user =new ownerModel({ first_name ,  last_name ,  email , phone, boys, girls, any , property_type ,  password:has_pass })
                     await new_user.save()
                     return Promise.resolve({first_name:new_user.first_name , last_name:new_user.last_name , email:new_user.email})  

                }
    }catch(err) {
        
        return Promise.reject(err)
         
    }
     
}






export async function newOwnerLogin(model) {
    try{    
      
        const {    email , password  } =  model 
          let temp_user = await ownerModel.findOne({email})
          if( temp_user==null) {
             return Promise.resolve({message:" please resigter first  "})
           } else {
                const { _id, first_name, last_name, email , password:hasspass } = temp_user
                  
                    let isMathc=await bcrypt.compare(password , hasspass)
                     if(isMathc) {
                        let token =  jwt.sign({ _id }, process.env.OWNER_PRIVATE_KEY )
                        return Promise.resolve({ first_name , last_name, email , token  }) 
                     }else{
                         return Promise.reject("invalid credentials")
                     }
                   
                }
        
    }catch(err) {
        
        return Promise.reject(err)
         
    }
     
}