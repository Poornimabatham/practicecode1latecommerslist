import Database from "@ioc:Adonis/Lucid/Database";
const { Duration, DateTime } = require("luxon");
const moment = require("moment");

export default class GetplannerWiseSummary {
  public static async Getlannerwisesummary(a) {
    const currentDate = a.attDen;

    var Date2 = currentDate.toFormat("yyyy-MM-dd");

    const fetchdatafromTimeOFFandAttendanceMaster = await Database.from(
      "Timeoff as Toff"
    )
      .innerJoin(
        "AttendanceMaster as AM",
        "Toff.TimeofDate",
        "AM.AttendanceDate"
      )

      .select(
        "AM.AttendanceStatus",
        "AM.AttendanceDate",
        "Toff.Reason",
        "Toff.TimeofDate",
        "Toff.TimeTo",
        "AM.TimeIn",
        "AM.TimeOut",
        "AM.timeindate",
        "AM.timeoutdate",
        "AM.TimeOutApp",
        "Toff.EmployeeId as TEID",
        "AM.EmployeeId as AMEID",
        Database.raw(
          `(SELECT SEC_TO_TIME(sum(time_to_sec(TIMEDIFF(Timeoff_end, Timeoff_start)))) FROM Timeoff WHERE 
                Toff.EmployeeId = ${a.userid} AND Toff.ApprovalSts != 2) AS timeoffhours`
        ),
        "AM.ShiftId",
        "AM.TotalLoggedHours AS thours",
        Database.raw(
          `(SELECT SEC_TO_TIME(sum(time_to_sec(TIMEDIFF(TimeTo, TimeFrom)))) FROM Timeoff WHERE 
                Toff.EmployeeId = ${a.userid} AND Toff.ApprovalSts != 2) AS bhour`
        ),
        Database.raw("SUBSTRING_INDEX(EntryImage, '.com/', -1) AS EntryImage"),
        Database.raw("SUBSTRING_INDEX(ExitImage, '.com/', -1) AS ExitImage"),
        Database.raw("CONCAT(LEFT(checkInLoc, 35), '...') AS checkInLoc"),
        Database.raw("CONCAT(LEFT(CheckOutLoc, 35), '...') AS CheckOutLoc"),
        "latit_in",
        "longi_in",
        "latit_out",
        "longi_out",
        "multitime_sts"
      )
      .limit(2)
      .where("AM.AttendanceDate", Date2)
      .where("AM.AttendanceStatus", 1);

    const result = await fetchdatafromTimeOFFandAttendanceMaster;
    const res: any[] = [];

    result.forEach(async (val) => {
      const data: any = {};
      data["AttendanceStatus"] = val.AttendanceStatus;
      const status = data["AttendanceStatus"];
      data["AttendanceDate"] = val.AttendanceDate;
      data["loggedHours"] = val.thours;
      data["Reason"] = val.Reason;
      data["TimeTo"] = val.TimeTo;
      var logged = data["loggedHours"];
      data["TimeIn"] = val.TimeIn;
      data["timeout"] = val.TimeOut;
      data["timeoutdate"] = moment(val.timeoutdate).format("YYYY-MM-DD");
      data["timeindate"] = moment(val.timeindate).format("YYYY-MM-DD");
      data["ShiftId"] = val.ShiftId;
      data["timeoffhours"] = val.timeoffhours;
      data["TimeOutApp"] = val.TimeOutApp;
      data["timeoffhours"] = val.timeoffhours;
      data["timeoutplatform"] = val.TimeOutApp;
      data["ShiftId"] = val.ShiftId;
      res.push(data)
      if (data["timeoffhours"] == null || data["timeoffhours"] == "") {
        data["timeoffhours"] = "00:00:00";
        var time = data["timeoffhours"];
      }

      if (data["timeoffhours"] == "00:00:00") {
        var queryResult1 = await Database.rawQuery(
          `SELECT SUBTIME( "${logged}","${time}") AS Loggedhours`
        );

        const row111 = queryResult1[0];

        if (row111.length > 0) {
          const loggedHoursResult = row111[0].Loggedhours;
        }
      }


      const queryResult = Database.from("ShiftMaster")
        .where("Id", 36)
        .select("TimeIn", "TimeOut", "shifttype", "HoursPerDay");

      const data123 = await queryResult.first();

      if (data123) {
        const shiftin = data123.TimeIn;
        const shiftout = data123.TimeOut;
        var shiftType = data123.shifttype;
        const hoursPerDay = data123.HoursPerDay;
        if (
          hoursPerDay === "00:00:00" ||
          hoursPerDay !== "" ||
          hoursPerDay === null
        ) {
          var shiftin1 = shiftin;
          var shiftout1 = shiftout;

          const startDateTime = DateTime.fromFormat(shiftin1, "HH:mm:ss");
          const endDateTime = DateTime.fromFormat(shiftout1, "HH:mm:ss");

          const Interval = Duration.fromMillis(
            endDateTime.diff(startDateTime).as("milliseconds")
          );

          var HoursPerDay = Interval.toFormat("hh:mm:ss");
        }

      }





      if (status == 4 || status == 1) {
        const halfInSeconds = Duration.fromISOTime(HoursPerDay).as("seconds");
        const v = halfInSeconds / 2;
        const hours = Math.floor(v / 3600);
        const minutes = Math.floor((v % 3600) / 60);

        const secs = v % 60;

        const timeString = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        const formattedTime2 = DateTime.fromFormat(
          timeString,
          "H:m:s"
        ).toFormat("hh:mm:ss");
      }


var weekoff_sts = "WO";
      if (val.TimeOut !== "00:00:00") {
        if (shiftType == 1) {
          data["thours"] = logged;
          if (weekoff_sts == "WaO" || weekoff_sts == "H") {
            const overtime = logged;
            // console.log('overtime',overtime)
          } else {
            var overtime = await Database.rawQuery(
              `SELECT SUBTIME( "${logged}","${HoursPerDay}") AS Overtime`
            );
            const row111 = overtime;

            if (row111.length > 0) {
              var overtime1 = row111[0].Overtime;
            }
          }


        } 
        else if (shiftType == 1) {
          data["thours"] = logged;
          if (weekoff_sts == "WO" || weekoff_sts == "H") {
            overtime1 = logged;
          } else {
            var overtime = await Database.rawQuery(
              `SELECT SUBTIME( "${logged}","${HoursPerDay}") AS Overtime`
            );
            const row111 = overtime;

            if (row111.length > 0) {
              var overtime1 = row111[0].Overtime;
            }
          }
        }
        
        else {
          overtime1 = "00:00:00";
        }
      }
       else {
        data["thours"] = "00:00:00";
        if (weekoff_sts == "WO" || weekoff_sts == "H") {
          overtime1 = logged;
        } else {
          overtime1 = "00:00:00";
        }
      }

      data["shiftin"] = shiftin1;
      data["shiftout"] = shiftout1;
      data["EntryImage"] = "-";


     

    });
    return res;
  }
}
