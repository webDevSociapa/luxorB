import express  from 'express';
let xl = express.Router()
import xlsx from 'node-xlsx';
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Products ,heighlighter } from './../models/products.js';

const __dirname = dirname(fileURLToPath(import.meta.url))





xl.get('/read-and-store' ,(req, res)=>{
    

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/luxer_pen_data.xlsx`));
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/luxer_pen_data.xlsx`);

// console.log(workSheetsFromFile , )





// pens 
 

// "category_type":"6537d22343346433a3754325",
// "name":"Konark",  
// "description":"Konark is a premium ball pen that boasts a finely executed engraved design, a designer body with a flawless twist mechanism, and a charismatic refill. This exquisite pen is elegantly packaged, making it an ideal gift choice." ,
// "icon":" Finely Engraved Design Flawless Twist Mechanism Perfect For Gifting " ,
// "did_you_know":"Renowned for their exceptional durability and long-lasting quality, metal luxury pens are crafted from premium materials, ensuring their robustness and longevity." 


let model = {
     
}

 let finnal_arr = []
  

// workSheetsFromFile[0].data.map((ele ,i, ar)=>{

//       if( i>0) {
//           ele.map((item , ind , arr )=>{
             
//                     if(  arr[ind]=="Pens - Metal Pens " ) {
//                         model['category_type'] = '6537d22343346433a3754325' 
//                      }   else if( arr[ind]=="Pens - Everyday Writing ") {
//                         model['category_type'] = '6537d24c6c7d38d8e947c8fa'
//                      }

                
//             })


//         }
         
//           if(ar[i].length>0){
//                  if(i>0){
//                     // console.log(ar[i])
//                     model["name"]=ar[i][1],  
//                     model["description"]=ar[i][2] ,
//                     model["icon"]=ar[i][3],
//                     model["did_you_know"]=ar[i][4]
//                     model['created_on'] = new Date()
//                     model['color'] = "all color"
                    
//                   //   console.log(model)
//                      // finnal_arr.push(model)
//                      // store(model)

//                   }
//                 }
// })










// markers 
workSheetsFromFile[1].data.map((ele ,i, ar)=>{

 
      //  ele.map((item , ind , arr )=>{
          
      //            if(  arr[ind]=="Pens - Metal Pens " ) {
      //                model['category_type'] = '6537d22343346433a3754325' 
      //             }   else if( arr[ind]=="Pens - Everyday Writing ") {
      //                model['category_type'] = '6537d24c6c7d38d8e947c8fa'
      //             }

             
      //    })


      
       if(ar[i].length>0){
         
                 // console.log(ar[i])
                 model["name"]=ar[i][0],  
                 model["description"]=ar[i][1] ,
                 model["icon"]=ar[i][2],
                 model["did_you_know"]=ar[i][3]
                 model['created_on'] = new Date()
                 model['color'] = "all color"
                 
               //   console.log(model)
                  // finnal_arr.push(model)
                  storeHeighlighter(model)          
             }
})



async function storePens(model){
   let inserted = await Products(model)
           await inserted.save() 
console.log("saved ", model )
}



async function storeHeighlighter(model){
   let inserted = await heighlighter(model)
           await inserted.save() 
console.log("saved ", model )
}

res.send({
    msg:"succesfully done"
})
// async function save() {

//   try{
//     for(let i=0; i<finnal_arr.length ; i++) {
//    console.log(finnal_arr[i])

//         let inserted = await Products(finnal_arr[i])
//         await inserted.save()   
//         console.log("saved")
//     }
//   }catch(err){
//       console.log(err)
//    }     
   
// }


//  save()
 

})


// (async function(){
//     // let inserted = await Products.insertMany(finnal_arr)
     
// } )()


export default xl