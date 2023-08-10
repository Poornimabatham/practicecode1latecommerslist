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
var jwt = require("jsonwebtoken");
var Database_1 = require("@ioc:Adonis/Lucid/Database");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.encode5t = function (str) {
        for (var i = 0; i < 5; i++) {
            str = Buffer.from(str).toString("base64");
            str = str.split("").reverse().join("");
        }
        return str;
    };
    Helper.decode5t = function (str) {
        for (var i = 0; i < 5; i++) {
            str = str.split("").reverse().join("");
            str = Buffer.from(str, "base64").toString("utf-8");
        }
        return str;
    };
    Helper.getTimeZone = function (orgid) {
        return __awaiter(this, void 0, void 0, function () {
            var query1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].query()
                            .from("ZoneMaster")
                            .select("name")
                            .where("id", Database_1["default"].raw("(select TimeZone from Organization where id =" + orgid + "  LIMIT 1)"))];
                    case 1:
                        query1 = _a.sent();
                        return [2 /*return*/, query1[0].name];
                }
            });
        });
    };
    Helper.getempnameById = function (empid) {
        return __awaiter(this, void 0, void 0, function () {
            var query2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].query()
                            .from("EmployeeMaster")
                            .select("FirstName")
                            .where("Id", empid)];
                    case 1:
                        query2 = _a.sent();
                        return [2 /*return*/, query2[0].FirstName];
                }
            });
        });
    };
    Helper.generateToken = function (secretKey, data) {
        if (data === void 0) { data = {}; }
        try {
            var payload = {
                audience: data.username,
                Id: data.empid
            };
            var options = {
                expiresIn: "1h",
                issuer: "Ubiattendace App"
            };
            var token = jwt.sign(payload, secretKey, options, {
                alg: "RS512",
                typ: "JWT"
            });
            return token;
        }
        catch (err) {
            console.log(err);
            return 0;
        }
    };
    Helper.getDepartmentIdByEmpID = function (empid) {
        return __awaiter(this, void 0, void 0, function () {
            var EmpQuery, departmentId, DepQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1["default"].from("EmployeeMaster")
                            .select("Department")
                            .where("id", empid)];
                    case 1:
                        EmpQuery = _a.sent();
                        if (!(EmpQuery.length > 0)) return [3 /*break*/, 3];
                        departmentId = EmpQuery[0].Department;
                        return [4 /*yield*/, Database_1["default"].from("DepartmentMaster")
                                .select("Id")
                                .where("Id", departmentId)];
                    case 2:
                        DepQuery = _a.sent();
                        if (DepQuery.length > 0) {
                            return [2 /*return*/, DepQuery[0].Id];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, 0];
                }
            });
        });
    };
    Helper.getAdminStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, queryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = 0;
                        return [4 /*yield*/, Database_1["default"].query()
                                .from("UserMaster")
                                .select("appSuperviserSts")
                                .where("EmployeeId", id)
                                .first()];
                    case 1:
                        queryResult = _a.sent();
                        if (queryResult) {
                            status = queryResult.appSuperviserSts;
                        }
                        return [2 /*return*/, status];
                }
            });
        });
    };
    Helper.getWeeklyOff = function (date, shiftId, emplid, orgid) {
        return __awaiter(this, void 0, void 0, function () {
            var dt, dayOfWeek, weekOfMonth, week, selectShiftId, shiftid, shiftRow, flage, holidayRow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dt = date;
                        dayOfWeek = 1 + new Date(dt).getDay();
                        weekOfMonth = Math.ceil(new Date(dt).getDate() / 7);
                        week = [];
                        return [4 /*yield*/, Database_1["default"].from("AttendanceMaster")
                                .select("ShiftId")
                                .where("AttendanceDate", "<", dt)
                                .where("EmployeeId", emplid)
                                .orderBy("AttendanceDate", "desc")
                                .limit(1)];
                    case 1:
                        selectShiftId = _a.sent();
                        if (selectShiftId.length > 0) {
                            shiftid = selectShiftId[0].ShiftId;
                        }
                        else {
                            return [2 /*return*/, "N/A"];
                        }
                        return [4 /*yield*/, Database_1["default"].from("ShiftMasterChild")
                                .where("OrganizationId", orgid)
                                .where("Day", dayOfWeek)
                                .where("ShiftId", shiftId)
                                .first()];
                    case 2:
                        shiftRow = _a.sent();
                        flage = false;
                        if (shiftRow) {
                            week = shiftRow.WeekOff.split(",");
                            flage = true;
                        }
                        if (!(flage && week[weekOfMonth - 1] != "1")) return [3 /*break*/, 3];
                        return [2 /*return*/, "WO"];
                    case 3: return [4 /*yield*/, Database_1["default"].from("HolidayMaster")
                            .where("OrganizationId", orgid)
                            .where("DateFrom", "<=", dt)
                            .where("DateTo", ">=", dt)
                            .first()];
                    case 4:
                        holidayRow = _a.sent();
                        if (holidayRow) {
                            return [2 /*return*/, "H"];
                        }
                        else {
                            return [2 /*return*/, "N/A"];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Helper;
}());
exports["default"] = Helper;