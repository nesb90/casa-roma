'use strict'

const fp = require('fastify-plugin');

const { POSTGRES, NODE_ENV } = require('../config');
const DBService = require('../services/db.service');
const DBPool = require('../db/db.pool');
const StockService = require('../services/stock.service')

function bootstrap (fastify, opts, done) {
  // Services
  const dbPool = new DBPool(POSTGRES.CONFIG);
  const dbService = new DBService(dbPool);
  const stockService = new StockService({ dbService })
  // decorate server
  fastify.decorate('nodeEnv', NODE_ENV);
  fastify.decorate('dbService', dbService);
  fastify.decorate('stockService', stockService);

  done();
};

module.exports = fp(bootstrap)
