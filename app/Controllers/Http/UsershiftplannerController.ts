<<<<<<< HEAD



import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UsershiftplannerService from 'App/Services/UsershiftplannerService';
import UsershiftplannerValidator from 'App/Validators/UsershiftPlannerValidator';


export default class UsershiftPlannerController {

    public async FetchUsershiftPlanner({request,response }: HttpContextContract) {
        const a = await  request.validate(UsershiftplannerValidator.fetchUsershiftplannerschema)
        const b = await  UsershiftplannerService.usershiftplanner(a)
        return  response.json(b)      
    }



    // public async storedeviceinfo({request,response }: HttpContextContract) {
    //     const a = await  request.validate(UsershiftplannerValidator.InsertdeviceInfochema)
    //     const b = await  UsershiftplannerService.Storedeviceinformation(a)
    //     return  response.json(b)      
    // }

    
    public async storedeviceinfo({request,response }: HttpContextContract) {
        const a = await  request.validate(UsershiftplannerValidator.ResetPasswordLinkchema)
        const b = await  UsershiftplannerService.ResetPassword(a)
        return  response.json(b)      
    }
    
=======
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UsershiftplannerService from "App/Services/UsershiftplannerService.";
import UsershiftplannerValidator from "App/Validators/UsershiftplannerValidator";

export default class UsershiftplannerController {
  public async FetchUsershiftPlanner({
    request,
    response,
  }: HttpContextContract) {
    const a = await request.validate(
      UsershiftplannerValidator.fetchUsershiftplannerschema
    );
    const b = await UsershiftplannerService.usershiftplanner(a);
    return response.json(b);
  }



  
  public async storedeviceinfo({request,response }: HttpContextContract) {
    const a = await  request.validate(UsershiftplannerValidator.InsertdeviceInfochema)
    const b = await  UsershiftplannerService.Storedeviceinformation(a)
    return  response.json(b)      
}

public async getShiftDetailsShiftPlanner({request,response}:HttpContextContract){
  const InputValidation = await request.validate(UsershiftplannerValidator.getShiftDetailsShiftPlanner)
  const output = await UsershiftplannerService.getShiftDetailsdata(InputValidation)
  return response.json(output)
}
>>>>>>> ffebf89e57986ac28718f87d43fe60c3fb17fef9
}
