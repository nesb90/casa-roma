const {
  parseDataArray,
  parseData,
  queryBuilder,
  TABLES
} = require('../../utils');

async function getOrderItem(request, reply) {
  const { id } = request.params
  this.log.info(`Getting order item ${id}`);

  const [order] = await this.dbService.doQuery(...queryBuilder.select(TABLES.orderItems, id));

  if (!order) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Order item not found' });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseData(order));
};

async function getAllOrderItems(request, reply) {
  const orderId = request.params.orderId
  this.log.info(`Get all items from order ${orderId}`);
  const [query, values] = queryBuilder.select(TABLES.orderItems, orderId)

  const result = await this.dbService.doQuery(query.replace('id=', 'order_id='), values);

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseDataArray(result));
};

async function createOrderItem(request, reply) {
  const data = request.body

  const [query, values] = queryBuilder.insert(TABLES.orderItems, data)
  const [orderItem] = await this.dbService.doQuery(query.concat(' RETURNING id'), values);

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ id: orderItem.id, message: 'Order item Created' });
};

async function updateOrderItem(request, reply) {
  const data = request.body
  const id = request.params.id
  this.log.info(`Updating order item ${id}`, data);

  await this.dbService.doQuery(queryBuilder.update(TABLES.orderItems, id, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Order Item updated' });
};

async function deleteOrderItemById(request, reply) {
  const { id } = request.params

  await this.dbService.doQuery(queryBuilder.remove(TABLES.orderItems, id));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'Order item deleted' });
};

module.exports = {
  getOrderItem,
  getAllOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItemById
}
