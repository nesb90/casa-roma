const {
  parseDataArray,
  parseData,
  queryBuilder,
  TABLES
} = require('../../utils');
/**
 * Note: fastify object is bound to `this`
 */

async function getItemById (request, reply) {
  const { id } = request.params
  this.log.info(`Getting item ${id}`);

  const [order] = await this.dbService.doQuery(...queryBuilder.select(TABLES.items, id))

  if (!order) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Order not found' });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseData(order));
};

async function getItems (request, reply) {
  this.log.info('Getting item all items');

  const result = await this.dbService.doQuery(queryBuilder.select(TABLES.items));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseDataArray(result));
};

async function createItem (request, reply) {
  const data =  request.body
  this.log.info('Creating new Item', data);

  await this.dbService.doQuery(...queryBuilder.insert(TABLES.items, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Item created' });
};

async function updateItem (request, reply) {
  const data =  request.body
  const id = request.params.id
  this.log.info(`Updating Item ${id}`, data);

  await this.dbService.doQuery(queryBuilder.update(TABLES.items, id, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Item updated' });
};

async function deleteItemById (request, reply) {
  const { id } = request.params

  await this.dbService.doQuery(queryBuilder.remove(TABLES.items, id));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'item deleted'});
};

module.exports = {
  getItemById,
  getItems,
  createItem,
  updateItem,
  deleteItemById
}
