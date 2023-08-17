"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Database_1 = require("@ioc:Adonis/Lucid/Database");
var GetapprovalRegularService = /** @class */ (function () {
    function GetapprovalRegularService() {
    }
    GetapprovalRegularService.GetregularizationApproverRejectedAPI = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var ActivityBy, module, count, count1, errorMsg, successMsg, Msg1, Msg, status, count11, con, regularizetimein, empname, newtimeout, selectRegularizaList, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ActivityBy = 0;
                        module = "";
                        count = 0;
                        count1 = 0;
                        errorMsg = "";
                        successMsg = "";
                        Msg1 = "Regularization could not be rejected.";
                        Msg = "Regularization could not be approved.";
                        status = false;
                        count11 = 0;
                        con = 0;
                        regularizetimein = "00:00:00";
                        newtimeout = "00:00:00";
                        if (data.RegularizationAppliedFrom != 2) {
                            ActivityBy = 0;
                            module = "ubiHRM APP";
                        }
                        if (data.RegularizationAppliedFrom == 2) {
                            ActivityBy = 1;
                            module = "ubiattendance APP";
                        }
                        if (!(data.attendance_id != "" && data.attendance_id != 0)) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        selectRegularizaList = Database_1["default"].from("AttendanceMaster")
                            .select("RegularizeTimeOut", "RegularizeTimeIn", "TimeIn", "TimeOut", "AttendanceDate", "EmployeeId")
                            .where("Id", data.attendance_id)
                            .first();
                        return [4 /*yield*/, selectRegularizaList.length];
                    case 2:
                        count1 = _a.sent();
                        if (!(count1 == 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(selectRegularizaList.map(function (val) { return __awaiter(_this, void 0, void 0, function () {
                                var timein, timeout, regularizetimein, orginaltimein, empid, queryResult, resultRows;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            newtimeout = val.RegularizeTimeOut;
                                            timein = val.TimeIn;
                                            timeout = val.TimeOut;
                                            regularizetimein = val.RegularizeTimeIn;
                                            orginaltimein = val.TimeIn;
                                            empid = val.EmployeeId;
                                            return [4 /*yield*/, Database_1["default"].from("EmployeeMaster")
                                                    .select("Shift", "Department", "Designation", "area_assigned", "CompanyEmail", Database_1["default"].raw("\n\t\t\t\t\t\tSELECT IF(LastName != '', CONCAT(FirstName, ' ', LastName), FirstName) as name,\n\t\t\t\t\t\t \n\t\t\t\t\t  "))
                                                    .where("Id", empid)
                                                    .andWhere("organizationId", data.organizationId)];
                                        case 1:
                                            queryResult = _a.sent();
                                            resultRows = queryResult.rows;
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return GetapprovalRegularService;
}());
exports["default"] = GetapprovalRegularService;
