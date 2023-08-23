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
var Helper_1 = require("App/Helper/Helper");
var moment_1 = require("moment");
var LateComingService = /** @class */ (function () {
    function LateComingService() {
    }
    LateComingService.getLateComing = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var Begin, month1, Date2, lateComersList, adminStatus, condition, Empid, response, Output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Begin = (data.Currentpage - 1) * data.Perpage;
                        month1 = new Date(data.Date);
                        Date2 = moment_1["default"](month1).format("yyyy-MM-DD");
                        lateComersList = Database_1["default"].from("AttendanceMaster as A")
                            .innerJoin("EmployeeMaster as E", "E.Id", "A.EmployeeId")
                            .innerJoin("ShiftMaster as S", "S.Id", "A.ShiftId")
                            .select("E.FirstName", "E.LastName", "A.ShiftId", "A.EmployeeId", "A.ShiftId", "A.AttendanceDate", Database_1["default"].raw("(SELECT TIMEDIFF(A.TimeIn, CASE WHEN S.TimeInGrace != '00:00:00' THEN S.TimeInGrace ELSE S.TimeIn END))\n         as earlyby"), Database_1["default"].raw("A.TimeIn > (CASE WHEN S.TimeInGrace != '00:00:00' THEN S.TimeInGrace ELSE S.TimeIn END)\n  AND TIMEDIFF(A.TimeIn, CASE WHEN S.TimeInGrace != '00:00:00' THEN S.TimeInGrace ELSE S.TimeIn END) >\n  '00:00:59'"), Database_1["default"].raw("SUBSTRING_INDEX(EntryImage, '.com/', -1) AS EntryImage"))
                            .andWhere("A.OrganizationId", data.Orgid)
                            .andWhereNotIn("A.AttendanceStatus", [2, 3, 5])
                            .andWhere("S.shifttype", "!=", 3)
                            .andWhere(" E.Is_Delete", 0)
                            .andWhere("A.AttendanceDate", Date2)
                            .orderBy("E.FirstName", "desc");
                        return [4 /*yield*/, Helper_1["default"].getAdminStatus(data.Empid)];
                    case 1:
                        adminStatus = _a.sent();
                        if (adminStatus == 2) {
                            Empid = data.Empid;
                            condition = "A.Dept_id = " + Empid;
                            lateComersList = lateComersList.where("A.Dept_id", condition);
                        }
                        response = [];
                        return [4 /*yield*/, lateComersList];
                    case 2:
                        Output = _a.sent();
                        Output.forEach(function (element) {
                            var data2 = {};
                            data2["lateBy"] = moment_1["default"](element.earlyby, 'HH:mm').format('HH:mm');
                            data2["timein"] = element.atimein ? element.atimein.substr(0, 5) : null;
                            data2["fullname"] = element.FirstName + " " + element.LastName;
                            data2["EntryImage"] = element.EntryImage;
                            data2["ShiftId"] = element.ShiftId;
                            data2["AttendanceDate"] = moment_1["default"](element.AttendanceDate).format("YYYY/MM/DD");
                            data2["A.EmployeeId"] = element.EmployeeId;
                            response.push(data2);
                        });
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return LateComingService;
}());
exports["default"] = LateComingService;
