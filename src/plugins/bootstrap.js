'use strict'

const fp = require('fastify-plugin');

const { POSTGRES, NODE_ENV } = require('../config');
const DBService = require('../services/db.service');
const DBPool = require('../db/db.pool');
const StockService = require('../services/stock.service');
const OrderService = require('../services/order.service');
const PaymentService = require('../services/payment.service');

function bootstrap (fastify, opts, done) {
  // Services
  const dbPool = new DBPool(POSTGRES.CONFIG);
  const dbService = new DBService(dbPool);
  const stockService = new StockService({ dbService });
  const orderService = new OrderService({ dbService });
  const paymentService = new PaymentService({ dbService });
  // decorate server
  fastify.decorate('nodeEnv', NODE_ENV);
  fastify.decorate('dbService', dbService);
  fastify.decorate('stockService', stockService);
  fastify.decorate('orderService', orderService);
  fastify.decorate('paymentService', paymentService);

  done();
};

module.exports = fp(bootstrap)
