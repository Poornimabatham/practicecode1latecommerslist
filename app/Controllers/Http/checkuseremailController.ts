import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Helper from 'App/Helper/Helper'

export default class checkuseremailController {
    public async index({request }: HttpContextContract) {
const email = request.input('email')
// 17
var  result:any={}
 var usermail = await Helper.encode5t(email);  
 console.log(usermail)      
  const checkquery = await Database.from("UserMaster").where("Username",usermail).limit(2)
  const num_rows = checkquery.length
  if(num_rows>0)
  {
     result['status'] = '1'; // already exist E-mail
  }
  else {
      result['status'] = '2';  // Not exist E-mail
  }
 return result

    }







    public async index2({request }: HttpContextContract) {
		var phone = request.input('phone') 
        console.log(phone)
        var  result:any={}
        var userphone = await 	 Helper.encode5t(phone);  
        console.log(userphone)
        var selectOrganizationList = await Database.from("Organization").where("PhoneNumber",phone).select("Id","Name")
        
const Organization_num_rows = selectOrganizationList
        const selectUserMasterList = await Database.from("UserMaster")
        .innerJoin('EmployeeMaster as E', 'E.Id', 'U.EmployeeId')
        .select(
          'U.username_mobile',
          Database.raw("CONCAT(E.FirstName, ' ', E.lastname) as Name"),
          'Password',
          'E.OrganizationId'
        )
        .from('UserMaster as U')
        .where('E.organizationId', Database.raw('U.organizationId'))
        .whereNot('U.username_mobile', userphone)
  
      var checkquery_num_row =selectUserMasterList;
      if(checkquery_num_row.length>0 || Organization_num_rows.length > 0 )
      {
        if (checkquery_num_row.length > 0) {
            result.name = checkquery_num_row[0].Name;
            result.password =await Helper.decode5t(checkquery_num_row[0].Password);
            result.orgName =await Helper.getOrgName(checkquery_num_row[0].OrganizationId);
            result.orgId = checkquery_num_row[0].OrganizationId;

          }
    
          if (Organization_num_rows.length > 0) {
            result.orgName = Organization_num_rows[0].Name;
            result.orgId = Organization_num_rows[0].Id;
          }
          
          
         result['status'] = '1'; 
      }
      else {
          result['status'] = '2';  
      }
return result
    }
  }
  
  
  
  
     