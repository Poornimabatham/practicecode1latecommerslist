import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'emp_key_storages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('EmployeeId', 11).notNullable()
      table.integer('OrganizationId', 9).notNullable()
      table.string('Token',400)
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
