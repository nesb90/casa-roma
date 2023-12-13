const { POSTGRES: { SCHEMA } } = require('../src/config')
const KnexExtensions = require('../src/db/knex-extensions')


exports.up = async function (knex) {
  const knexHelper = new KnexExtensions(knex);

  await knexHelper.createTable('expenses', function expenses(table) {
    table.increments('id');
    table.decimal('amount').notNullable();
    table.string('expense_concept').notNullable();
    table.timestamps(true, true);
  }, SCHEMA);
};

exports.down = async function (knex) {
  await knex.schema.withSchema(SCHEMA).dropTable('expenses');
};
