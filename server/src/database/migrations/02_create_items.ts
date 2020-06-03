import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary().unsigned().notNullable();
        table.string('title', 50).notNullable();
        table.string('image', 100).notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}