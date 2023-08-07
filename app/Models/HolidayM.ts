import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import { BaseModel, column,  hasOne,  HasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';

import  holidays from "App/Models/holidays";

export default class HolidayM extends BaseModel {
  public static table ="holidaymaster"
  
  @column({isPrimary: true})
  public Id: number

  @column({columnName:'Name'})
  public Name: string

  @column({columnName:'Description'})
  public Description: string

  @column({columnName:'OrganizationId'})
  public OrganizationId: number
  
  //    @column({columnName:"DateFrom"})
  //    public DateFrom: DateTime

  // @column({columnName:"DateTo"})
  // public DateTo: DateTime


  @column.dateTime({columnName:"DateFrom"})
  public DateFrom: DateTime;

  @column.dateTime({columnName:"DateTo"})
  public DateTo: DateTime;

  // ...

  public getFormattedDate(dateColumn: DateTime): string {
    return dateColumn.toFormat('yyyy-MM-dd'); // Customize the format as needed
  }
  
  // @hasOne(()=>holidays)
  // public homme:HasOne<typeof holidays>

  // HolidayM.$getrelation
  

}
