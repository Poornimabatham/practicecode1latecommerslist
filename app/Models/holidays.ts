import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
//import  HolidayM from "App/Models/HolidayM";

export default class holidays extends BaseModel {

  public static table ="holidays"
  
  @column({isPrimary: true})
  public id: number

  @column({columnName:"holiday_Name"})
  public holiday_Name: string

  @column({columnName: "status"})
  public status: number

  @column({columnName:'HM_Id'})
  public HM_Id: number 

  @belongsTo(() => HolidayM, {
    foreignKey: 'HM_Id'
  })
  public holidays: BelongsTo<typeof HolidayM>

  // @belongsTo(()=>HolidayM)
  // public holidays:BelongsTo<typeof HolidayM>
}
