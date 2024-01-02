const TABLES = {
  items: 'items',
  stock: 'stock',
  orders: 'orders',
  orderItems: 'order_items',
  payments: 'payments'
};

const ORDER_STATUSES = [
  'RECEIVED',
  'PROCESSING',
  'CANCELLED',
  'COMPLETED'
];

module.exports = {
  TABLES,
  ORDER_STATUSES
};
