'use strict'

const { SERVER } = require('../config');
const orderItemHandlers = require('./handlers/order-item.handler')

module.exports = async function order(fastify) {
  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/order-item/:id`,
    schema: {
      summary: 'Single Order Item',
      description: 'Get an order item by id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['id', 'orderId', 'itemId', 'quantity'],
          properties: {
            id: { type: 'number' },
            orderId: { type: 'number' },
            itemId: { type: 'number' },
            quantity: { type: 'number' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderItemHandlers.getOrderItem
  });

  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/order-item/order/:orderId`,
    schema: {
      summary: 'Get order items',
      description: 'Get all order items.',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'orderId', 'itemId', 'quantity'],
            properties: {
              id: { type: 'number' },
              orderId: { type: 'number' },
              itemId: { type: 'number' },
              quantity: { type: 'number' }
            }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderItemHandlers.getAllOrderItems
  });

  fastify.route({
    method: 'POST',
    url: `${SERVER.API_ROUTE.V1}/order-item`,
    schema: {
      summary: 'Create order',
      description: 'Create a new order.',
      consumes: ['application/json'],
      produces: ['application/json'],
      body: {
        type: 'object',
        required: ['orderId', 'itemId', 'quantity'],
        properties: {
          orderId: { type: 'number' },
          itemId: { type: 'number' },
          quantity: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['id', 'message'],
          properties: {
            id: { type: 'number' },
            message: { type: 'string' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderItemHandlers.createOrderItem
  });

  fastify.route({
    method: 'PUT',
    url: `${SERVER.API_ROUTE.V1}/order-item/:id`,
    schema: {
      summary: 'Update order item',
      description: 'Update order item properties.',
      consumes: ['application/json'],
      produces: ['application/json'],
      body: {
        type: 'object',
        properties: {
          orderId: { type: 'number' },
          itemId: { type: 'number' },
          quantity: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          required: ['message'],
          properties: {
            message: { type: 'string' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderItemHandlers.updateOrderItem
  });

  fastify.route({
    method: 'DELETE',
    url: `${SERVER.API_ROUTE.V1}/order-item/:id`,
    schema: {
      summary: 'Delete order item',
      description: 'Delete order item by Id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['message'],
          type: 'object',
          properties: {
            message:  { type: 'string' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderItemHandlers.deleteOrderItemById
  });
};
