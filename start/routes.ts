/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import "../app/Routes/EmployeeRoute"
import "../app/Routes/SignInRoute"
import  "../app/Routes/DesignationRoute"
import "../app/Routes/GeofenceRoute"
import "../app/Routes/GeofenceRoute"
import "../app/Routes/UserSettingRoute"
import  "../app/Routes/DepartmentRoute"
import  "../app/Routes/GetTokenRoute"
import  '../app/Routes/ShiftRoute'
import  '../app/Routes/HolidayRoute'
import  '../app/Routes/GetEarlyComingsRoute'
import "../app/Routes/LateComingRoute"
import "../app/Routes/Report/GetplannerRoute"

