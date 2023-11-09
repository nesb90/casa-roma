const { POSTGRES: { SCHEMA } } = require('../src/config')
const KnexExtensions = require('../src/db/knex-extensions')


exports.up = async function (knex) {
  const knexHelper = new KnexExtensions(knex);

  await knexHelper.alterTable('stock', function stock(table) {
    table.integer('initial_stock');
    table.timestamps(true, true);
    table.unique('item_id');
  }, SCHEMA);
};

exports.down = async function (knex) {
  await knex.schema.withSchema(SCHEMA).alterTable('stock', function stock (table){
    table.dropColumn('initial_stock');
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropUnique('item_id');
  });
};

