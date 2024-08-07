const {
  parseDataArray,
  parseData,
  queryBuilder,
  TABLES,
  ORDER_STATUSES
} = require('../../utils');
/**
 * Note: fastify object is bound to `this`
 */

async function getPaymentById (request, reply) {
  const { id } = request.params
  this.log.info(`Getting payment ${id}`);

  const [order] = await this.dbService.doQuery(...queryBuilder.select(TABLES.payments, id));

  if (!order) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Order not found' });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseData(order));
};

async function getPaymentsByOrderId (request, reply) {
  const { orderId } = request.params
  this.log.info(`Getting payment ${orderId}`);

  const payments = await this.paymentService.getPaymentsByOrderId(orderId);

  if (!payments) {
    reply.code(404).header('Content-Type', 'application/json').send({ message: 'Order not found' });
  }

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(payments);
};

async function getPayments (request, reply) {
  this.log.info('Getting payment all payments');

  const result = await this.dbService.doQuery(queryBuilder.select(TABLES.payments));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send(parseDataArray(result));
};

async function createPayment (request, reply) {
  const data =  request.body
  this.log.info('Creating new payment', data);

  const hasPayments = await this.paymentService.hasPayments(data.orderId);

  if(!hasPayments) {
    console.log('Initial payment');
    const orderData = {
      status: ORDER_STATUSES[1]
    };

    await this.dbService.doQuery(queryBuilder.update(TABLES.orders, data.orderId, orderData));
  };

  await this.dbService.doQuery(...queryBuilder.insert(TABLES.payments, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'payment created' });
};

async function updatePayment (request, reply) {
  const data =  request.body
  const id = request.params.id
  this.log.info(`Updating payment ${id}`, data);

  await this.dbService.doQuery(queryBuilder.update(TABLES.payments, id, data));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'payment updated' });
};

async function deletePaymentById (request, reply) {
  const { id } = request.params

  await this.dbService.doQuery(queryBuilder.remove(TABLES.payments, id));

  reply
    .code(200)
    .header('Content-Type', 'application/json')
    .send({ message: 'payment deleted'});
};

module.exports = {
  getPaymentById,
  getPayments,
  createPayment,
  updatePayment,
  deletePaymentById,
  getPaymentsByOrderId
};
