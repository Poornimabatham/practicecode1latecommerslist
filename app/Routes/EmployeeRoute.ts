import Route from '@ioc:Adonis/Core/Route'

Route.get('/emplist','EmployeesController.emplist').middleware('throttle:global').middleware('auth')

