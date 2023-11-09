const {
  parseDataArray,
  parseData,
  queryBuilder,
  TABLES
} = require('../../utils');

async function getOrder (request, reply) {
  const { id } = request.params
  this.log.info(`Getting order ${id}`);

  const [order] = await this.dbService.doQuery(...queryBuilder.select(TABLES.orders, id));

  if (!order) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Order not found' });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseData(order));
};

async function getAllOrders (request, reply) {
  this.log.info('Get all Orders');

  const result = await this.dbService.doQuery(queryBuilder.select(TABLES.orders));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseDataArray(result));
};

async function createOrder (request, reply) {
  const { items, ...data} = request.body

  const [sql, values] = queryBuilder.insert(TABLES.orders, data)
  const result = await this.dbService.doQuery(sql.concat(' RETURNING id'), values);

  if(Array.isArray(items) && items.length > 0) {
    items.forEach(async (item) => {
      item.orderId = result[0].id;
      await this.dbService.doQuery(...queryBuilder.insert(TABLES.orderItems, item));
    });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Order Created' });
};

async function updateOrder (request, reply) {
  const data =  request.body
  const id = request.params.id
  this.log.info(`Updating Order ${id}`, data);

  await this.dbService.doQuery(queryBuilder.update(TABLES.orders, id, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Order updated' });
};

async function deleteOrderById (request, reply) {
  const { id } = request.params

  await this.dbService.doQuery(queryBuilder.remove(TABLES.orders, id));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Order deleted'});
};

module.exports = {
  getOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrderById
}
