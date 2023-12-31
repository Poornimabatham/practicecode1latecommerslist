import Database from "@ioc:Adonis/Lucid/Database";
import Helper from "App/Helper/Helper";
const moment = require("moment-timezone");
const dayjs = require("dayjs");

export default class LateComingService {
  // Insert Designation method
  public static async getLateComing(data) {
   
    const datefrom = new Date(data.Date); // Assuming you have a date object or a valid date string
    const dateString = datefrom.toLocaleDateString("en-US"); // Change 'en-US' to your preferred locale
    const DateFrom = moment(dateString, "MM/DD/YYYY").format("YYYY/MM/DD");

    var Begin = (data.Currentpage - 1) * data.Perpage;

    let limit: any = {};
    if (data.csv == "") {
      limit = `${Begin}`;
    } else {
      limit = "";
    }
    const zone = await Helper.getTimeZone(data.Orgid);
    const currentDateTime = moment().tz(zone);

    const dateFormatted = moment(currentDateTime).format("YYYY-MM-DD");

    const timeFormatted = moment(currentDateTime).format("HH:mm:ss");
    const res: any[] = [];

    var adminStatus = await Helper.getAdminStatus(data.Empid);
    let lateComersList:any =  Database.from('AttendanceMaster as A')
  .innerJoin('EmployeeMaster as E', 'E.Id', 'A.EmployeeId')
  .innerJoin('ShiftMaster as S', 'S.Id', 'A.ShiftId')
  .select(
    'E.FirstName',
    'E.LastName',
    'A.TimeIn as atimein',
    'A.ShiftId',
    "E.Department",
    "A.Dept_id",
  )
  
  .where('A.OrganizationId', data.Orgid)
  .andWhere('A.AttendanceDate', DateFrom)

    var condition = "";
    console.log(adminStatus)

    if (adminStatus == 0) {
      const deptId = data.Empid;

console.log(deptId)     
 condition = `A.Dept_id = ${deptId}`;
      lateComersList= lateComersList.where(
        "A.Dept_id",
        condition
      );
    }

    

    const Output = await lateComersList;
    
    Output.forEach((element) => {
      const data2: any = {};
      data2["lateBy"] = element.latehours;

      data2["timein"] = element.atimein ? element.atimein.substr(0, 5) : null;

      data2["fullname"] = `${element.FirstName} ${element.LastName}`;
      data2["EntryImage"] = element.EntryImage;
      data2["ShiftId"] = element.ShiftId;
      data2["date"] = DateFrom;
      data2['Department'] = element.Department
      data2['Dept_id'] = element.Dept_id
      res.push(data2);
    });

    return res;
  }
}
