const _ = require('lodash');

const { POSTGRES } = require('../config');
const {
  isRequired,
  parseDataArray,
  queryBuilder,
  TABLES,
  ORDER_STATUSES
} = require('../utils')

class StockService {
  constructor({
    dbService = isRequired('dbService')
  }) {
    this.dbService = dbService
  };

  async getRentedItems() {
    const query = `
      select
        item_id, sum(quantity) as total_quantity
      from
        ${POSTGRES.SCHEMA}.${TABLES.orderItems} oi
      inner join
        ${POSTGRES.SCHEMA}.${TABLES.orders} o
      on
        oi.order_id = o.id
      where
        o.status = '${ORDER_STATUSES[1]}'
      group by item_id
      order by item_id asc
    `;
    const totalQuantities = await this.dbService.doQuery(query);
    return parseDataArray(totalQuantities);
  };

  async setAvailableStock (stocks = []) {
    const processedStocks = [];
    let rentedItems = await this.getRentedItems();
    rentedItems = parseDataArray(rentedItems);
    stocks.forEach((stock) => {
      const item = rentedItems.find((i) => i.itemId === stock.itemId);
      if (item) {
        stock.availableStock = stock.total - parseInt(item.totalQuantity);
      } else {
        stock.availableStock = stock.total;
      };
      processedStocks.push(stock);
    });
    return processedStocks;
  };

  async getAllStocks() {
    const stocks = await this.dbService.doQuery(queryBuilder.select(TABLES.stock));
    const processedStocks = await this.setAvailableStock(parseDataArray(stocks));
    return processedStocks;
  };
};

module.exports = StockService
