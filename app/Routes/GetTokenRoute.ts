import Route from '@ioc:Adonis/Core/Route'

Route.post('/refreshtoken','GetTokensController.getToken').middleware('throttle:global').middleware('auth')

