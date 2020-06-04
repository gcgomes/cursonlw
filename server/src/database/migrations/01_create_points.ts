import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary().unsigned().notNullable();
        table.string('name', 50).notNullable();
        table.string('email', 150).notNullable();
        table.string('whatsapp', 15).notNullable();
        table.string('image', 100).notNullable();
        table.decimal('latitude', 9,7).notNullable();
        table.decimal('longitude', 9, 7).notNullable();
        table.string('city', 100).notNullable();
        table.integer('state_id').unsigned().notNullable().references('id').inTable('state');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}