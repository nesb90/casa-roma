const { POSTGRES: { SCHEMA } } = require('../src/config')
const KnexExtensions = require('../src/db/knex-extensions')


exports.up = async function(knex) {
  const knexHelper = new KnexExtensions(knex);

  await knexHelper.createTable('items', function items (table) {
    table.increments('id');
    table.string('name');
    table.string('description');
    table.decimal('rent_price');
    table.decimal('item_price');
    table.timestamps(true, true);
  }, SCHEMA);

  await knexHelper.createTable('orders', function orders (table){
    table.increments('id');
    table.string('customer_name').notNullable();
    table.string('address').notNullable();
    table.datetime('event_date').notNullable();
    table.datetime('returned_at');
    table.boolean('is_cancelled').notNullable().defaultTo(false);
    table.timestamps(true, true);
  }, SCHEMA);

  await knexHelper.createTable('order_items', function orderItems (table){
    table.increments('id');
    table.integer('order_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('orders', SCHEMA))
      .notNullable();
    table.integer('item_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('items', SCHEMA))
      .notNullable();
    table.integer('quantity').notNullable();
    table.timestamps(true, true);
  }, SCHEMA);

  await knexHelper.createTable('stock', function stock (table){
    table.increments('id');
    table.integer('item_id')
      .references('id')
      .inTable(this.getTableReferenceWithSchema('items', SCHEMA))
      .notNullable();
    table.integer('total');
  }, SCHEMA);
};

exports.down = async function(knex) {
  await knex.schema.withSchema(SCHEMA).dropTable('items');
  await knex.schema.withSchema(SCHEMA).dropTable('orders');
  await knex.schema.withSchema(SCHEMA).dropTable('order_items');
  await knex.schema.withSchema(SCHEMA).dropTable('stock');
};
