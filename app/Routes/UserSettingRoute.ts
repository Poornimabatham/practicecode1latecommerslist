import Route from '@ioc:Adonis/Core/Route'

Route.get("/changepass",'UsersettingsController.UpdatePass').middleware('throttle:global').middleware('auth')
Route.get("/Updateprofile",'UsersettingsController.UpdateProfile').middleware('throttle:global')
Route.get("/PunchvisitCsv",'UsersettingsController.getPunchInfoCsv');
Route.get("/getPunchInfo","UsersettingsController.getPunchInfo");
Route.get("/Employeelist","UsersettingsController.getEmployeesList");
Route.get("/getNotification","UsersettingsController.OrgCheck");
Route.put("/notificationchange","UsersettingsController.Notification")
Route.put("/updatenotification","UsersettingsController.UpdateNotification");
Route.get("/getImageprofile","UsersettingsController.getProfileImage")


  
