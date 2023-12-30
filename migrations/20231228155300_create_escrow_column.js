const { POSTGRES: { SCHEMA } } = require('../src/config')
const KnexExtensions = require('../src/db/knex-extensions')


exports.up = async function (knex) {
  const knexHelper = new KnexExtensions(knex);

  await knexHelper.alterTable('orders', function stock(table) {
    table.integer('escrow');
  }, SCHEMA);
};

exports.down = async function (knex) {
  await knex.schema.withSchema(SCHEMA).alterTable('orders', function stock(table) {
    table.dropColumn('escrow');
  });
};