import Route from '@ioc:Adonis/Core/Route'

Route.get("/changepass",'UsersettingsController.UpdatePass').middleware('throttle:global').middleware('auth')
