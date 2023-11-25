const { POSTGRES: { SCHEMA } } = require('../src/config')
const KnexExtensions = require('../src/db/knex-extensions')


exports.up = async function (knex) {
  const knexHelper = new KnexExtensions(knex);

  await knexHelper.createTable('payments', function payments (table) {
    table.increments('id');
    table.integer('order_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('orders', SCHEMA))
      .notNullable();
    table.decimal('amount').notNullable();
    table.string('pay_concept').notNullable();
    table.timestamps(true, true);
  }, SCHEMA);
};

exports.down = async function (knex) {
  await knex.schema.withSchema(SCHEMA).dropTable('payments');
};
