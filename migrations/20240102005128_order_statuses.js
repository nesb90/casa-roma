const { POSTGRES: { SCHEMA } } = require('../src/config');
const KnexExtensions = require('../src/db/knex-extensions');
const { ORDER_STATUSES } = require('../src/utils')


exports.up = async function (knex) {
  const knexHelper = new KnexExtensions(knex);

  await knexHelper.alterTable('orders', function stock(table) {
    table.enu('status', ORDER_STATUSES);
    table.dropColumn('is_cancelled');
  }, SCHEMA);
};

exports.down = async function (knex) {
  await knex.schema.withSchema(SCHEMA).alterTable('orders', function stock(table) {
    table.dropColumn('status');
    table.boolean('is_cancelled').notNullable().defaultTo(false);
  });
};
