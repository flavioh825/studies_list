'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
        .references('id').inTable('users')
        .onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('kind')
      table.string('path')
      table.timestamps()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
