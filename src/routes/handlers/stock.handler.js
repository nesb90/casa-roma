const {
  parseDataArray,
  parseData,
  queryBuilder,
  TABLES
} = require('../../utils');

/**
 * Note: fastify object is bound to `this`
 */

async function getStockById (request, reply) {
  const { id } = request.params
  this.log.info(`Getting stock ${id}`);

  const [stock] = await this.dbService.doQuery(...queryBuilder.select(TABLES.stock, id))

  if (!stock) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Stock not found' });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseData(stock));
};

async function getStock (request, reply) {
  this.log.info('Get all stocks');

  const result = await this.dbService.doQuery(queryBuilder.select(TABLES.stock))

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseDataArray(result));
};

async function createStock (request, reply) {
  const data =  request.body
  this.log.info('Creating new stock', data);

  await this.dbService.doQuery(...queryBuilder.insert(TABLES.stock, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Stock created' });
};

async function updateStock (request, reply) {
  const data =  request.body
  const id = request.params.id
  this.log.info(`Updating stock ${id}`, data);

  await this.dbService.doQuery(queryBuilder.update(TABLES.stock, id, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Stock updated' });
};

async function deleteStock (request, reply) {
  const { id } = request.params

  await this.dbService.doQuery(queryBuilder.remove(TABLES.stock, id));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'stock deleted'});
};

module.exports = {
  getStockById,
  getStock,
  createStock,
  updateStock,
  deleteStock
}
