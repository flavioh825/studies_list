'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStudiesSchema extends Schema {
  up () {
    this.create('studies', (table) => {
      table.increments()
      table.string('name', 150).notNullable()
      table.text('description')
      table.date('started_at')
      table.date('finished_at')
      table.boolean('display_in_status').defaultTo(false)
      table.boolean('visible').defaultTo(true)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('studies')
  }
}

module.exports = CreateStudiesSchema
