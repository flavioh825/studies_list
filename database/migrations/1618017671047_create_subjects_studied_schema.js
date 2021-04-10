'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSubjectsStudiedSchema extends Schema {
  up () {
    this.create('create_subjects_studieds', (table) => {
      table.increments()
      table.string('name', 150).notNullable()
      table.text('description')
      table.date('started_at')
      table.date('finished_at')
      table.boolean('display_in_status').defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('create_subjects_studieds')
  }
}

module.exports = CreateSubjectsStudiedSchema
