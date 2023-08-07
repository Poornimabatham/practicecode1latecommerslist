import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class loginValidator  extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super()

  }
    static loginV ={
    schema:schema.create({
    userName: schema.string(),
    password: schema.string(),
    }),message: BaseValidator.messages
  }
  static logout ={
      schema:schema.create({
      empid: schema.number(),
      orgid: schema.number(),
    }), message: BaseValidator.messages
  }
}