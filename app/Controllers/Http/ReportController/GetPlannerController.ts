import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Plannervalidator from "App/Validators/ReportValidator/PlannerValidator";
import GetplannerWiseSummary from "App/Services/ReportServices/PlannerService";
export default class GetplannerController {
  public async data({ request, response }: HttpContextContract) {
    const a = await request.validate(Plannervalidator.FetchPlannerchema);
    const b = await GetplannerWiseSummary.Getlannerwisesummary(a);
    return response.json(b);
  }
}