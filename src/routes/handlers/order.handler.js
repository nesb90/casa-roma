const { POSTGRES } = require('../../config');
const {
  parseDataArray,
  parseData,
  queryBuilder,
  formatToISODate,
  TABLES
} = require('../../utils');

async function getOrderItemsByOrderId (orderId, dbService) {
  const orderItems =  await dbService.doQuery(`select * from ${POSTGRES.SCHEMA}.${TABLES.orderItems} where order_id=${orderId}`);
  if (Array.isArray(orderItems) && orderItems.length > 0) {
    return parseDataArray(orderItems);
  };
  return []
}

async function getOrder (request, reply) {
  const { id } = request.params
  this.log.info(`Getting order ${id}`);

  let [order] = await this.dbService.doQuery(...queryBuilder.select(TABLES.orders, id));

  if (!order) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Order not found' });
  }

  order.items = await getOrderItemsByOrderId(id, this.dbService);

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseData(order));
};

async function getAllOrders (request, reply) {
  this.log.info('Get all Orders');

  const result = await this.dbService.doQuery(queryBuilder.select(TABLES.orders));

  const orders = await Promise.all(result.map(async (order) => {
    order.items = await getOrderItemsByOrderId(order.id,  this.dbService);
    return order;
  }));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseDataArray(orders));
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

  await this.dbService.doQuery(queryBuilder.update(TABLES.orders, id, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Order updated' });
};

async function deleteOrderById (request, reply) {
  const { id } = request.params

  const orderItems = await this.dbService.doQuery(`select id from ${POSTGRES.SCHEMA}.${TABLES.orderItems} where order_id=${id}`);
  if(Array.isArray(orderItems) && orderItems.length > 0) {
    orderItems.forEach(async item => {
      await this.dbService.doQuery(queryBuilder.remove(TABLES.orderItems, item.id));
    });
  }
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
