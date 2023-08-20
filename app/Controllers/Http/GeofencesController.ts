import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GeofenceValidator from 'App/Validators/GeofenceValidator'
import getgeofenceservice from 'App/Services/GeofenceService';

export default class GeofencesController {

    public async getgeofence({request,response}: HttpContextContract){

        const req = await request.validate(GeofenceValidator.getgeofence);

        const ser = await getgeofenceservice.getgeofence(req);

        return response.json(ser);
    }

public async addgeofence({request,response}: HttpContextContract){

    const req = await request.validate(GeofenceValidator.addgeofence);

    const ser = await getgeofenceservice.addgeofence(req);

    return response.json(ser);
}

}
