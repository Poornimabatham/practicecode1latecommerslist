import Route from '@ioc:Adonis/Core/Route'

Route.get("/resetPasswordLink",'ResetPasswordLinkController.ResetPassword')
Route.get("/getAllowAttToUser",'ResetPasswordLinkController.getAllowAttToUser')