import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import  User  from 'App/Models/userModel';
export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const { email, password } = request.all();
    const user: User = await User.create({ email, password });
   
    await user.save()
    return response.json(user);
  }
}
