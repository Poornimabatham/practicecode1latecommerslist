import Route from '@ioc:Adonis/Core/Route'

Route.get("/getusershiftdata",'UsershiftPlannerController.FetchUsershiftPlanner')

Route.post("/storedeviceinfo",'UsershiftPlannerController.storedeviceinfo')