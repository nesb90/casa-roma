const _ = require('lodash');

const { isRequired,
  TABLES,
  parseDataArray
 } = require("../utils");
const { POSTGRES } = require('../config');

class OrderService {
  constructor({
    dbService = isRequired('dbService')
  }) {
    this.dbService = dbService;
    this.tableName = TABLES.orders;
  };

  async getOrderItemsByOrderId (orderId) {
    const orderItems =  await this.dbService.doQuery(`select * from ${POSTGRES.SCHEMA}.${TABLES.orderItems} where order_id=${orderId}`);
    if (Array.isArray(orderItems) && orderItems.length > 0) {
      return parseDataArray(orderItems);
    };
    return [];
  };

  buildGetOrdersQuery(status) {
    let query = `select * from ${POSTGRES.SCHEMA}.${this.tableName}`;

    if (!_.isEmpty(status)) {
      query = query.concat(` where status = '${status}'`)
    };

    return `${query} order by created_at DESC`;
  };

  async getOrders(status = '') {
    return await this.dbService.doQuery(this.buildGetOrdersQuery(status));
  };
};

module.exports = OrderService;
