import Database from "@ioc:Adonis/Lucid/Database";
import moment from "moment";
import Helper from "App/Helper/Helper";
export default class UsershiftplannerService {
  public static async usershiftplanner(getvalue) {
    const userid = getvalue.uid;
    const organizationId = getvalue.orgid;

    var selectAttendanceMasterList = await Database.from(
      "AttendanceMaster as A"
    )
      .innerJoin("ShiftMaster AS S", "A.ShiftId", "S.Id")
      .select(
        "A.AttendanceDate",
        "A.TimeIn as PunchTimeIn",
        "A.TimeOut as PunchTimeOut",
        "A.AttendanceStatus",
        "A.ShiftId",
        "S.shifttype",
        "S.HoursPerDay",
        "S.TimeIn",
        "S.TimeOut",
        "A.disapprove_sts "
      )
      .where("S.OrganizationId", organizationId)
      .where("A.EmployeeId", userid);
    const response: any[] = [];
    selectAttendanceMasterList.forEach((element) => {
      const data: any = {};
      // data['AttendanceDate'] = moment(element.AttendanceDate).format('YYYY-MM-DD');
      data["AttendanceDate"] = element.AttendanceDate;

      data["AttendanceStatus"] = element.AttendanceStatus;
      data["ShiftType"] = element.shifttype;
      data["STimeIn"] = element.TimeIn;
      data["STimeOut"] = element.TimeOut;
      data["PunchTimeIn"] = element.PunchTimeIn;
      data["PunchTimeOut"] = element.PunchTimeOut;
      data["disapprove"] = element.disapprove_sts;
      data["Logged"] = element.HoursPerDay;
      response.push(data);
    });
    return response;
  }

  public static async Storedeviceinformation(inputdata) {
    var Empid = inputdata.empid;
    var Deviceid = inputdata.deviceid;
    var Devicename = inputdata.devicename;
    const updateEmployeeMaster = await Database.from("EmployeeMaster")
      .where("Id", Empid)
      .update({
        DeviceName: Devicename,
        DeviceId: Deviceid,
      });
    return updateEmployeeMaster;
  }

  public static async ResetPassword(data) {
    const una = await Helper.encode5t(data.una);
    console.log(una);
    var result2 = [];

    const result = await Database.from("EmployeeMaster")
      .select(
        "Id",
        "OrganizationId",
        "FirstName",
        "LastName",
        Database.raw(
          "(SELECT resetPassCounter FROM  UserMaster  WHERE Username = ? OR username_mobile = ?) as  ctr",
          [una, una]
        ),
        Database.raw(
          "(SELECT Username FROM  UserMaster  WHERE Username = ? OR username_mobile = ?) as  email",
          [una, una]
        )
      )
      .where(
        "Id",
        Database.raw(
          "(SELECT  EmployeeId FROM UserMaster WHERE Username =? OR username_mobile=?)",
          [una, una]
        )
      );
     
      if (result2.length > 0) {
        console.log("22")
        const row = result2[0];
        // const orgid = row.OrganizationId;
        // console.log(orgid)
        // const email = row.email ? decode5t(row.email) : '';
        // const Name = `${row.FirstName} ${row.LastName}`;
    
        const querytest = await Database.from('All_mailers')
          .select('Body', 'Subject')
          .where('Id', '23')
        if (querytest.length) {
          const body = querytest[0].Body;
          const subject = querytest[0].Subject;
    
          // const url = `https://ubiattendance.ubihrm.com/index.php/services/HastaLaVistaUbi?hasta=${Encryption.encrypt(row.Id)}&vista=${Encryption.encrypt(orgid)}&ctrpvt=${Encryption.encrypt(row.ctr)}`;
    
          // const logo = "<img src='https://ubiattendance.ubiattendance.xyz/newpanel/index.php/../assets/img/myubiAttendance_logo.jpg' style='width: 200px;'  <p style='text-align: center; line-height:1; ><br></p><p class='MsoNormal' style='text-align: center; margin-bottom: 0.0001pt; line-height: 1;'><b><span style='font-size: 24px; font-family: &quot;Times New Roman&quot;'>";
    
          // const body1 = body.replace('{Admin_Name}', Name);
          // const body2 = body1.replace('{variable_here}', url);
          // const body3 = body2.replace('{logo}', logo);
    
          // const headers = 'From: <noreply@ubiattendance.com>\r\n';
          // // sendEmailNew(email, subject, body3, headers);
    
          // console.log('reset password link mail');
          // console.log(body3);
    
          return { status: '1' };
        } else {
          return { status: '0' };
        }
      } 
      else {
        return { status: '2' };
      }
  }
}
