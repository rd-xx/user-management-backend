import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.timestamps(true, true, true);
    table.string('email').notNullable().unique();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.date('birthDate').notNullable();
    table.text('passwordHash').notNullable();
    table.text('passwordSalt').notNullable();
  });

  await knex.schema.createTable('pets', (table) => {
    table.increments('id').primary();
    table.timestamps(true, true, true);
    table.text('name').notNullable();
    table.text('weight').notNullable();
    table.integer('userId').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('pets');
}
