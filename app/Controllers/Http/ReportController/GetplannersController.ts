 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetplannerController {
    public async FetchUserPlannerSummary({request}: HttpContextContract) {
        const userid = request.input('uid')
        const refno = request.input('refno')
        const attDate = request.input
      }}
