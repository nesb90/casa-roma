const _ = require('lodash');

const { isRequired } = require("../utils");
const { POSTGRES } = require('../config');

class OrderService {
  constructor({
    dbService = isRequired('dbService')
  }) {
    this.dbService = dbService;
  };

  buildQuery (tableName, id, props = [], filters = {}) {
    let query =  `select * from ${POSTGRES.SCHEMA}.${tableName}`;

    if (props.length > 0) {
      const keys = props.map((prop) => {
        return _.snakeCase(prop);
      });
      query = query.replace('*', `${keys.join(',')}`);
    };

    if (!_.isEmpty(filters)) {
      if (filters.startDate && filters.endDate) {
        query = query.concat(` where created_at BETWEEN '${filters.startDate}' and '${filters.endDate}'`);
      };

      if (filters.cancelled) {
        if (query.includes('where')) {
          query = query.concat(` and is_cancelled = ${filters.cancelled}`);
        } else {
          query = query.concat(` where is_cancelled = ${filters.cancelled}`);
        };
      }

      if (filters.completed) {
        if (filters.cancelled) {
          query = query.concat(' or returned_at notnull');
        } else if (!filters.cancelled && query.includes('where')) {
          query = query.concat(' and returned_at notnull');
        } else {
          query = query.concat(' where returned_at notnull');
        }
      };
    };

    if (id) {
      return [`${query} where id=($1)`, [id]];
    } else {
      return `${query} order by id ASC`;
    };
  };

  async getOrders (tableName, id, props = [], filters = {}) {
    return await this.dbService.doQuery(this.buildQuery(tableName, id, props, filters));
  };
};

module.exports = OrderService;
