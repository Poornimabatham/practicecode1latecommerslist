import Route from '@ioc:Adonis/Core/Route'

Route.get("/getusershiftdata",'UsershiftPlannerController.FetchUsershiftPlanner')

Route.get("/storedeviceinfo",'UsershiftPlannerController.storedeviceinfo')