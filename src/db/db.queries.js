const {
	POSTGRES
} = require('../config');

const {
	TABLES
} = require('../utils');

function getOrderTotalQuery(orderId) {
	return `
	select
	  sum(oi.quantity * i.rent_price) as order_total
	from
		${POSTGRES.SCHEMA}.${TABLES.orderItems} oi
	inner join
		${POSTGRES.SCHEMA}.${TABLES.items} i
	on
		oi.item_id = i.id
	where
		oi.order_id = ${orderId};
	`;
};

module.exports = {
	getOrderTotalQuery
}
