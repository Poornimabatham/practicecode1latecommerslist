//import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Helper from 'App/Helper/Helper';
const jwt = require('jsonwebtoken');

export default class Login {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
  
  var arr =request.headers().authorization;
  var token=arr?.split('@@')[1];
  var key=process.env.secretKey

try {
  var decoded = jwt.verify(token,key);
  // console.log(Object.keys(decoded).length);
  if(Object.keys(decoded).length>0){
  let empid = await Helper.decode5t(decoded.Id);
       const query = await Database.query().select("*").from("Emp_key_Storage")
       .where("EmployeeId",empid).andWhere('Token','LIKE',"%"+token+"%");
       
        if(query.length>0){
           await next()
        }else{
          response.status(400).send({Message:"Invalid Access"}); 
        }    
  await next()
  }else{
    response.status(400).send({Message:"Token Not Decoded"});
  }
} catch(err) {
  if(err){
  if(err.name == 'TokenExpiredError'){
    response.status(400).send({Message:err.message,name:err.name}); 
  }else if(err.name=='JsonWebTokenError'){
      response.status(401).send({Message:err.message,name:err.name}); 
  }else{
      response.status(402).send({Message:err.message});
  }
  
}
    
  // // }else{
  // //   return response.status(501).json("INVALID USER")}
  // }
  // jwt.verify(token,key, async(err,decoded)=>{
    
  //   if(err){
  //       if(err.name == 'TokenExpiredError'){
  //         response.status(400).send({Message:"Token Expired"}); 
  //         //here generate again token and stored and return token

  //       }else if(err.name=='JsonWebTokenError'){
  //           console.log(err.name=='JsonWebTokenError')
  //           response.status(401).send({Message:err.message,name:err.name}); 
  //       }else{
  //           response.status(402).send({Message:err.message,name:err.name});
  //       }
  //   }else{
  //     console.log(decoded);
  //     let empid=await Helper.decode5t(decoded.Id);
  //      const query = await Database.query().select("*").from("Emp_key_Storage")
  //      .where("EmployeeId",empid).andWhere('Token','LIKE',"%"+token+"%");
  //     //  console.log(query);
       
  //       if(query.length>0){
  //          await next()
  //       }else{
  //         response.status(400).send({Message:"Invalid Access"}); 
  //       }    
  //   }
      // }
      // let x= async(docs)=>{
      //   console.log(docs);
      //        let empid= Helper.decode5t(docs.Id);
      //         const query = await Database.query().select("*").from("Emp_key_Storage")
      //         .where("EmployeeId",empid).andWhere('Token','LIKE',"%"+token+"%");
      //        //  console.log(query);
              
      //          if(query.length>0){
      //             await next()
      //          }else{
      //            response.status(400).send({Message:"Invalid Access"}); 
      //          }    
      //      }

  }
//   ) 
//  }
}
}
