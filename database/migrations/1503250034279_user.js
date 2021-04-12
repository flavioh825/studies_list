'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('name', 50).notNullable()
      table.string('lastname', 100).notNullable()
      table.string('password', 255).notNullable()
      table.string('profession', 150)
      table.string('country', 100)
      table.string('city', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
