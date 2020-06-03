import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('points_has_items', table => {
        table.integer('points_id').unsigned().notNullable().references('id').inTable('points');
        table.integer('items_id').unsigned().notNullable().references('id').inTable('items');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points_has_items');
}