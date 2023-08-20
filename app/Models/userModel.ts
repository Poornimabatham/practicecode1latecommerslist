import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

// app/Models/User.ts
export default interface User {
    id: number;
    email: string;
    password: string;
    // Add other user properties here
  }

  export default class UserOnly extends BaseModel{

    @column({columnName:'id'})
    public id: number
  
    @column({columnName:'email'})
    public email: string
  
    @column({columnName:'password'})
    public password: string

  }
  