import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('state', table => {
        table.increments('id').primary().unsigned().notNullable();
        table.string('name', 50).notNullable();
        table.string('abbreviation', 2).notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('state');
}