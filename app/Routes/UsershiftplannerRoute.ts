import Route from '@ioc:Adonis/Core/Route'

<<<<<<< HEAD
Route.get("/getusershiftdata",'UsershiftPlannerController.FetchUsershiftPlanner')

Route.get("/storedeviceinfo",'UsershiftPlannerController.storedeviceinfo')
=======
Route.get("/storedeviceinfo",'UsershiftplannerController.storedeviceinfo')
Route.get("/usershiftplanner",'UsershiftplannerController.FetchUsershiftPlanner')
Route.get("/getShiftDetailsShiftPlanner",'UsershiftplannerController.getShiftDetailsShiftPlanner')
>>>>>>> ffebf89e57986ac28718f87d43fe60c3fb17fef9
