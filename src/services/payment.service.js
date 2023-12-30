const {
  isRequired,
  TABLES,
  parseDataArray,
  parseData,
  queryBuilder
} = require("../utils");
const { getOrderTotalQuery } = require('../db/db.queries');

class PaymentService {
  constructor({
    dbService = isRequired('dbService')
  }) {
    this.dbService = dbService;
  };

  buildPayment (payments = [], orderTotal) {
    const totalPayments = payments.reduce((acc, curr) => {
      acc = acc + parseFloat(curr.amount);
      return acc;
    }, 0);

    return {
      currentBalance: orderTotal - totalPayments,
      orderTotal,
      payments
    };
  };

  async getOrderTotal (orderId) {
    const query = getOrderTotalQuery(orderId);
    let [result] = await this.dbService.doQuery(query);
    result = parseData(result);
    return result.orderTotal;
  };

  async getPaymentsByOrderId (orderId) {
    const [query, values] = queryBuilder.select(TABLES.payments, orderId);
    let payments = await this.dbService.doQuery(query.replace('id=', 'order_id='), values);
    payments = parseDataArray(payments);
    const orderTotal = await this.getOrderTotal(orderId);

    return this.buildPayment(payments, orderTotal);
  };
};

module.exports = PaymentService;
