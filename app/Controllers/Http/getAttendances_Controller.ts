import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AttendancesValidator from 'App/Validators/getAttendances_Validator'
import LogicsOnly from 'App/Services/getAttendances_service'

export default class getAttendances {

    public async index({request,response}: HttpContextContract){ 

        const Value = await request.validate(AttendancesValidator.newPostSchema)
        const result = await LogicsOnly.getAttendances__bothchange(Value)
        return response.json(result)

    }   
}