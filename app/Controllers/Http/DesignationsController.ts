import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DesignationService from "App/Services/DesignationService";
import DesignationValidator from "App/Validators/DesignationValidator";
export default class DesignationsController {
  public async retreiveDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(DesignationValidator.Designationschema);

    const b = await DesignationService.getDesignation(a);

    return response.json(b);
  }

  public async AddDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(DesignationValidator.AddDesignationschema);

    const b = await DesignationService.AddDesignation(a);

    return response.json(b);
  }

  public async UpdateDesign({ request, response }: HttpContextContract) {
    const a = await request.validate(
      DesignationValidator.updateDesignationschema
    );

    const b = await DesignationService.updateDesignation(a);

    return response.json(b);
  }
}
