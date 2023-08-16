import Database from "@ioc:Adonis/Lucid/Database";
import Helper from "App/Helper/Helper";
import moment from "moment";
// import { DateTime } from "luxon";
// import moment from "moment-timezone";

export default class DailyAttendanceService {

    public static async getpresentList(data) {
        var begin = (data.currentPage - 1) * data.perPage;
        var limit;
        var offset;
        var designationCondition;

        if (data.currentPage != 0 && data.csv == "") {
            limit = data.perPage;
            offset = begin;
        }
        else {
            limit = "";
            offset = "";
        }
        // var utcOffset
        // var cdate;
        // if (inpDate) {
        //     // var now = inpDate.setZone('Asia/Kabul')
        //     // cdate = now.toFormat('yyyy-MM-dd HH:mm:ss')
        //     cdate = moment().tz('Europe/Tirane').toDate()
        //     // cdate = moment.tz.zonesForCountry('Asia/Kolkata', true);

        //     return cdate
        //     // cdate = DateTime.fromJSDate(inpDate).setZone({ offset: 'utcOffset', name: 'Asia/Kolkata' });

        // }
        // return utcOffset
        // else {
        //     cdate = new Date()
        // }
        // // var formattedDate = cdate.toISOString()
        // // return formattedDate;
        // return cdate

        // let date;
        // var formattedDateTime

        // if (inpDate) {
        //     var cdate=inpDate.setZone('Asia/Kolkata')
        //     // date = DateTime.fromJSDate(inpDate, { zone: 'Asia/Kabul' })
        //     formattedDateTime = cdate.toFormat('yyyy-MM-dd ')
        // } else {
        //     date = DateTime.now().setZone('Asia/Kabul');
        //     formattedDateTime = date.toFormat('yyyy-MM-dd ')
        // }

        // return formattedDateTime;


        // const formattedDateTime= formatDateTime(inpDate,'Asia/Kabul')

        //         var zone = await Helper.getTimeZone(data.OrganizationId)
        //         var timeZone = zone[0]?.name;
        //         const now = inpDate ? inpDate.setZone('Asia/Kabul') : DateTime.local().setZone('Asia/Kabul')
        //         const FormattedDate = now.toFormat('yyyy-MM-dd HH:mm:ss');
        //         return FormattedDate

        // var formattedDate = inpDate
        //     ? DateTime.fromISO(inpDate, { zone: 'utc' }).setZone('Asia/Kabul')
        //     : DateTime.now().setZone('Asia/Kabul');
        // var FormattedDate = formattedDate.toFormat('yyyy-MM-dd HH:mm:ss')


        var adminStatus = await Helper.getAdminStatus(data.EmployeeId);

        var condition;


        var departmentId = await Helper.getDepartmentIdByEmpId(data.EmployeeId);

        if (data.dataFor == 'present') {


            const countRecordsQuery: any = await Database.from('AttendanceMaster').select('Id').where('AttendanceDate', '2023-02-03').andWhere('OrganizationId', data.OrganizationId).whereIn('AttendanceStatus', [1, 3, 5]).whereIn('EmployeeId', Database.rawQuery(`(SELECT Id from EmployeeMaster where OrganizationId =${data.OrganizationId} AND Is_Delete = 0 )`)).count('Id as Id')

            var totalCount;
            if (countRecordsQuery.length > 0) {
                totalCount = countRecordsQuery[0].Id;
            }
            var DailyAttPresentReportDataQueryResult;
            var DailyAttPresentReportDataQuery = Database.from('AttendanceMaster as A').select(
                Database.raw("CONCAT(E.FirstName, ' ', E.LastName) as name"),
                Database.raw("SUBSTR(A.TimeIn, 1, 5) as `TimeIn`"),
                Database.raw("(SELECT shifttype FROM ShiftMaster WHERE Id = ShiftId) as shiftType"),
                Database.raw("SUBSTR(A.TimeOut, 1, 5) as `TimeOut`"),
                Database.raw("'Present' as status"),
                Database.raw("SUBSTRING_INDEX(A.EntryImage, '.com/', -1) as EntryImage"),
                Database.raw("SUBSTRING_INDEX(A.ExitImage, '.com/', -1) as ExitImage"),
                Database.raw("SUBSTR(A.checkInLoc, 1, 40) as checkInLoc"),
                Database.raw("SUBSTR(A.CheckOutLoc, 1, 40) as CheckOutLoc"),
                'A.latit_in',
                'A.longi_in',
                'A.latit_out',
                'A.longi_out',
                'A.Id',
                'A.TotalLoggedHours',
                'A.AttendanceStatus',
                'A.ShiftId',
                'A.multitime_sts',
            )
                .innerJoin('EmployeeMaster as E', 'A.EmployeeId', 'E.Id')
                .innerJoin('DesignationMaster as DM', 'A.Desg_id', 'DM.Id')
                .where('E.OrganizationId', data.OrganizationId)
                .whereIn('A.AttendanceStatus', [1, 3, 4, 5, 8])
                .where('A.AttendanceDate', '2023-02-03')
                .where('E.Is_Delete', 0)
                .orderBy('name', 'asc')
                .limit(limit)
                .offset(offset);

            if (adminStatus == 2) {
                var departmentId = await Helper.getDepartmentIdByEmpId(data.EmployeeId);
                condition = `E.Department = ${departmentId}`;
                DailyAttPresentReportDataQuery.whereRaw(condition);
            }

            if (data.DesignationId != 0 && data.DesignationId != undefined) {
                designationCondition = ` Desg_id= ${data.DesignationId}`;
                DailyAttPresentReportDataQuery.whereRaw(designationCondition);
            }
            DailyAttPresentReportDataQueryResult = await DailyAttPresentReportDataQuery;



            // return DailyAttPresentReportDataQueryResult

            interface DailyAttendancePresent {
                name: string,
                shiftType: number,
                AttendanceStatus: number,
                TimeIn: string,
                TimeOut: string,
                Status: string,
                MultiTimeStatus: number,
                checkInLoc: string,
                CheckOutLoc: string,
                latit_in: string,
                longi_in: string,
                latit_out: string,
                longi_out: string,
                Id: number,
                TotalLoggedHours: string,
                totalCount: number,
                EntryImage: string,
                ExitImage: string,
            }

            var result: DailyAttendancePresent[] = [];

            if (DailyAttPresentReportDataQueryResult) {
                DailyAttPresentReportDataQueryResult.forEach((row) => {

                    const data: DailyAttendancePresent = {
                        name: row.name,
                        shiftType: row.shiftType,
                        AttendanceStatus: row.AttendanceStatus,
                        TimeIn: row.TimeIn,
                        TimeOut: row.TimeOut,
                        Status: row.status,
                        MultiTimeStatus: row.multitime_sts,
                        checkInLoc: row.checkInLoc,
                        CheckOutLoc: row.CheckOutLoc,
                        latit_in: row.latit_in,
                        longi_in: row.longi_in,
                        latit_out: row.latit_out,
                        longi_out: row.longi_out,
                        Id: row.Id,
                        TotalLoggedHours: row.TotalLoggedHours,
                        totalCount: totalCount,
                        EntryImage: row.EntryImage,
                        ExitImage: row.ExitImage,
                    }
                    result.push(data);

                })
            }

            else {
                result.push()
            }

            data['present'] = result;
            // return data['present']
        }
        else if (data.dataFor == "absent") {
            var departmentCondition;
            var AttendanceDate;
            if (adminStatus == 2) {
                var departmentId = await Helper.getDepartmentIdByEmpId(data.EmployeeId);
                departmentCondition = `Dept_id = ${departmentId}`;
            }

            // if (data.date == undefined) {
            //     AttendanceDate = new Date().toISOString().split('T')[0];
            // }
            // else {
            //     AttendanceDate = data.date.toFormat('yyyy-MM-dd')
            // }

            if (data.date != undefined) {                  //for other day's absentees
                AttendanceDate = data.date;
                var formattedAttendanceDate = moment(AttendanceDate).format('YYYY-MM-DD')

                const absCountQuery = await Database.from('AttendanceMaster').where('AttendanceDate', formattedAttendanceDate).where('OrganizationId', data.OrganizationId).whereIn('AttendanceStatus', [2, 7]).whereIn('EmployeeId', Database.rawQuery(`(SELECT Id from EmployeeMaster where OrganizationId =${data.OrganizationId} AND Is_Delete = 0 )`)).count('Id as abscount')

                var absCount;
                if (absCountQuery.length > 0) {
                    absCount = absCountQuery[0].abscount;
                }

                // return absCount
                var orgId = data.OrganizationId;
                var absentCountQuery = Database.from('AttendanceMaster as A').select(
                    Database.raw("(select CONCAT(FirstName,' ',LastName) FROM EmployeeMaster where Id = EmployeeId) as name"),
                    Database.raw(` '-' as TimeOut`),
                    Database.raw(` '-' as TimeIn`),
                    Database.raw('(select ApprovalStatus from AppliedLeave where EmployeeId = A.EmployeeId and ApprovalStatus = 2 and Date = 2023-03-02) as LeaveStatus'))
                    .innerJoin('EmployeeMaster as E', 'E.Id', 'A.EmployeeId')
                    .where('AttendanceDate', '2023-02-01')
                    .whereIn('AttendanceStatus', [2, 7])
                    .where('A.OrganizationId', data.OrganizationId)
                    .whereIn('EmployeeId', Database.raw(`SELECT Id FROM EmployeeMaster WHERE OrganizationId= ${orgId} AND Is_Delete = 0`))
                    .orderBy('name', 'asc')


                if (departmentCondition != undefined) {
                    absentCountQuery = absentCountQuery.whereRaw(departmentCondition);
                }

                if (data.DesignationId != 0 && data.DesignationId != undefined) {
                    designationCondition = ` Desg_id= ${data.DesignationId}`;    // From AttendanceMaster
                    absentCountQuery = absentCountQuery.whereRaw(designationCondition);
                }
                var absentCountQueryResult = await absentCountQuery;

                interface absentList {
                    name: string,
                    TimeIn: string,
                    TimeOut: string,
                    LeaveStatus: string,
                    absCount: number
                }

                var absentListResult: absentList[] = [];

                if (absentCountQueryResult.length > 0) {

                    var Name;
                    var name = absentCountQueryResult[0].name;

                    if (name.split(' ').length > 3) {
                        var words = name.split(' ', 4);
                        var firstthree = words.slice(0, 3);
                        Name = firstthree.join(' ') + '...';
                    }
                    else {
                        Name = name;
                    }
                    absentCountQueryResult.forEach((row) => {
                        var absentData: absentList = {
                            name: Name,
                            TimeIn: row.TimeIn,
                            TimeOut: row.TimeOut,
                            LeaveStatus: row.LeaveStatus,
                            absCount: absCount
                        }
                        absentListResult.push(absentData);
                    })

                }

                else {
                    absentListResult.push()
                }

                data['absent'] = absentListResult;
                return data['absent']

            }
            else            //For Today's Absentees
            {

                if (adminStatus == 2) {
                    var departmentId = await Helper.getDepartmentIdByEmpId(data.EmployeeId);
                    departmentCondition = `Dept_id = ${departmentId}`;
                }

                var AbsCountQuery;

                AbsCountQuery = Database.from('AttendanceMaster as A').select(
                    Database.raw(`CONCAT (E.FirstName, ' ' ,E.LastName)  as name`),
                    Database.raw(` '-' as Timeout `),
                    Database.raw(` '-' as TimeOut `),
                )
                    .innerJoin('EmployeeMaster as E', 'A.EmployeeId', 'E.Id')
                    .where('AttendanceDate', '2023-03-02')
                    .where('A.OrganizationId', data.OrganizationId)
                    .whereIn('AttendanceStatus', [2, 7])
                    .orderBy('name', 'asc')


                // return AbsCountQuery

                if (data.DesignationId != 0 && data.DesignationId != undefined) {
                    designationCondition = ` Desg_id= ${data.DesignationId}`;              // From AttendanceMaster
                    AbsCountQuery = AbsCountQuery.whereRaw(designationCondition);
                }

                if (departmentCondition != undefined) {
                    AbsCountQuery = AbsCountQuery.whereRaw(departmentCondition);
                }

                var AbsCountQueryResult = await AbsCountQuery
                // return AbsCountQueryResult


                var AttendanceDatep = moment(data.date);
                var attDate = AttendanceDatep.format('yyyy-MM-DD')
                var AbsentCountQuery
                AbsentCountQuery = Database.from('EmployeeMaster as E').select(
                    Database.raw(`CONCAT(E.FirstName, ' ', E.LastName) as name`),
                    Database.raw(` '-' as TimeIn `),
                    Database.raw(` '-' as TimeOut `),
                    Database.raw(`(select ApprovalStatus FROM AppliedLeave WHERE EmployeeId=E.Id AND ApprovalStatus=2 AND Date='2023-02-05') as LeaveStatus`),
                    'A.AttendanceStatus')
                    .innerJoin('AttendanceMaster as A', 'A.EmployeeId', 'E.Id')
                    .innerJoin('ShiftMaster as S', 'A.ShiftId', 'S.Id')
                    .whereNotIn('E.Id', Database.from('AttendanceMaster as A').select('A.EmployeeId').where('A.OrganizationId', data.OrganizationId).whereIn('A.AttendanceStatus', [1, 8, 4, 7]).whereNotIn('A.Wo_H_Hd', [11, 12])).andWhere('E.OrganizationId', data.OrganizationId)
                    .andWhere(builder => {
                        builder.where('E.Id', Database.raw(`(select empid from ShiftPlanner WHERE ShiftPlanner.orgid=${data.OrganizationId} and ShiftPlanner.empid=E.Id)`))
                            .orWhere('E.Id', Database.raw(`E.Shift`));
                    })
                    // .groupBy('E.Id')
                    // .orderBy('name', 'asc')
                    .limit(25);


                // return AbsentCountQuery


                // if (data.DesignationId != 0 && data.DesignationId != undefined) {
                //     designationCondition = `Designation= ${data.DesignationId}`;          // From AttendanceMaster
                //     AbsentCountQuery = AbsentCountQuery.whereRaw(designationCondition);
                // }

                if (departmentCondition != undefined) {
                    AbsentCountQuery = AbsentCountQuery.whereRaw(departmentCondition);
                }

                var AbsentCountQueryResult = await AbsentCountQuery
                // return AbsentCountQueryResult

                interface OtherDayAbsentList {
                    name: string,
                    TimeIn: string,
                    TimeOut: string,
                    LeaveStatus: string
                }

                var otherDayAbsentData: OtherDayAbsentList[] = []
                if (AbsentCountQuery.length > 0) {

                    var Name;
                    var name = AbsentCountQueryResult[0].name;
                    if (name.split(' ').length > 3) {
                        var words = name.split(' ', 4);
                        var firstthree = words.slice(0, 3);
                        Name = firstthree.join(' ') + '...';
                    }
                    else {
                        Name = name;
                    }
                    AbsentCountQueryResult.forEach((row) => {
                        const otherDayAbsentList: OtherDayAbsentList = {
                            name: Name,
                            TimeIn: row.TimeIn,
                            TimeOut: row.TimeOut,
                            LeaveStatus: row.LeaveStatus
                        }
                        otherDayAbsentData.push(otherDayAbsentList)
                    })


                }
                else {
                    otherDayAbsentData.push()
                }

                data['absent'] = AbsCountQueryResult.concat(AbsentCountQueryResult)
                return data['absent']
            }
        }


        else if (data.dataFor == 'latecomings') {

            // var AttendanceDateLC = data.date;
            // var FormattedAttendanceDate = moment(AttendanceDateLC).format('YYYY-MM-DD')
            var DepartmentCondition
            if (adminStatus == 2) {
                var DepartmentId = await Helper.getDepartmentIdByEmpId(data.EmployeeId);
                DepartmentCondition = `Dept_id=${DepartmentId}`;
            }

            //Today's Late Comers
            var LateComingsQuery = Database.from('EmployeeMaster as E').select(
                Database.raw(`CONCAT(FirstName,' ',LastName) as name`),
                Database.raw(`SUBSTR(TimeIn,1,5) as 'TimeIn'`),
                Database.raw(`SUBSTR(TimeOut, 1, 5) as 'TimeOut'`),
                Database.raw(`'Present' as status`),
                Database.raw(`SUBSTRING_INDEX(EntryImage, '.com/', -1) as EntryImage`),
                Database.raw(`SUBSTRING_INDEX(ExitImage, '.com/', -1) as ExitImage`),
                Database.raw(`SUBSTR(checkInLoc, 1, 40) as checkInLoc`),
                Database.raw(`SUBSTR(CheckOutLoc, 1, 40) as CheckOutLoc`),
                'latit_in', 'longi_in', 'latit_out', 'longi_out', 'A.Id', 'multitime_sts', 'ShiftId', 'TotalLoggedHours'
            )
                .where('E.Id', data.EmployeeId)
                .innerJoin('AttendanceMaster as A', 'A.EmployeeId', 'E.Id')
                .whereRaw(`SUBSTRING(time(TimeIn), 1, 5) > SUBSTRING((SELECT (CASE WHEN time(TimeInGrace) != '00:00:00' THEN time(TimeInGrace) ELSE time(TimeIn) END) FROM ShiftMaster WHERE ShiftMaster.Id = "A.ShiftId"), 1, 5)AND AttendanceDate='2023-02-01' AND A.OrganizationId=${data.OrganizationId} AND AttendanceStatus IN (1,4,8) `)


            if (data.DesignationId != 0 && data.DesignationId != undefined) {
                designationCondition = ` Desg_id= ${data.DesignationId}`;              // From AttendanceMaster
                LateComingsQuery = LateComingsQuery.whereRaw(designationCondition);
            }
            if (DepartmentCondition != undefined) {
                LateComingsQuery = LateComingsQuery.whereRaw(DepartmentCondition );
            }
            // return LateComingsQuery

            var  LateComingsQueryResult = await  LateComingsQuery;
            interface LateComingsList {
                name: string,
                TimeIn: string,
                TimeOut: string,
                status: string,
                EntryImage: string,
                ExitImage: string,
                checkInLoc: string,
                checkOutLoc: string,
                latit_in: string,
                latit_out: string,
                Id: number,
                multitime_sts: string,
                shiftType: number,
                getInterimAttAvailableSts: number,
                TotalLoggedHours: string
            }

            var LateComingsData: LateComingsList[] = [];

            if ((LateComingsQueryResult).length > 0) {

                LateComingsQueryResult.forEach(async (row) => {
                    var lateComingsList: LateComingsList = {
                        name: row.name,
                        TimeIn: row.TimeIn,
                        TimeOut: row.TimeOut,
                        status: row.status,
                        EntryImage: row.EntryImage,
                        ExitImage: row.ExitImage,
                        checkInLoc: row.checkInLoc,
                        checkOutLoc: row.CheckOutLoc,
                        latit_in: row.latit_in,
                        latit_out: row.latit_out,
                        Id: row.Id,
                        multitime_sts: row.multitime_sts,
                        shiftType: await Helper.getShiftType(row.ShiftId),
                        getInterimAttAvailableSts: await Helper.getInterimAttAvailableSt(row.Id),
                        TotalLoggedHours: row.TotalLoggedHours
                    }
                    LateComingsData.push(lateComingsList)
                })
            }
            // return LateComingsData;

            else {
                LateComingsData.push()
            }
            data['latecomings'] = LateComingsData;
            return data['latecomings'];
        }

    }
}


