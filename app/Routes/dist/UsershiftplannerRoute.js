"use strict";
exports.__esModule = true;
var Route_1 = require("@ioc:Adonis/Core/Route");
Route_1["default"].get("/storedeviceinfo", 'UsershiftPlannerController.storedeviceinfo');
Route_1["default"].get("/usershiftplanner", 'UsershiftPlannerController.FetchUsershiftPlanner');