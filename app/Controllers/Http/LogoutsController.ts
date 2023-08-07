import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import loginService from 'App/Services/loginService';
import loginValidator from 'App/Validators/loginValidator';

export default class LogoutsController {
    public async logout({ request, response }: HttpContextContract) {
        
        const data = await request.validate(loginValidator.logout);
        const result = await loginService.logout(data)
        if(result != 0){
            response.status(200).send({Message:"Logout Successfully",value:true})
        }else{
            response.status(402).send({Message:"some error Ouccured",value:false})
        }
    }

}
