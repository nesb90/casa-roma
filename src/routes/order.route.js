'use strict'

const { SERVER } = require('../config');
const orderHandlers = require('./handlers/order.handler')

module.exports = async function order(fastify) {
  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/order/:id`,
    schema: {
      summary: 'Single Order',
      description: 'Get an order by id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['id', 'customerName', 'address', 'eventDate', 'returnedAt', 'isCancelled'],
          properties: {
            id: { type: 'number' },
            customerName: { type: 'string' },
            address: { type: 'string' },
            eventDate: { type: 'string' },
            returnedAt: { type: 'string' },
            isCancelled: { type: 'boolean' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderHandlers.getOrder
  });

  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/order`,
    schema: {
      summary: 'Get orders',
      description: 'Get all orders.',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'customerName', 'address', 'eventDate', 'returnedAt', 'isCancelled'],
            properties: {
              id: { type: 'number' },
              customerName: { type: 'string' },
              address: { type: 'string' },
              eventDate: { type: 'string' },
              returnedAt: { type: 'string' },
              isCancelled: { type: 'boolean' }
            }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: orderHandlers.getAllOrders
  });

  fastify.route({
    method: 'POST',
    url: `${SERVER.API_ROUTE.V1}/order`,
    schema: {
      summary: 'Create order',
      description: 'Create a new order.',
      consumes: ['application/json'],
      produces: ['application/json'],
      body: {
        type: 'object',
        required: ['customerName', 'address', 'eventDate'],
        properties: {
          customerName: { type: 'string' },
          address: { type: 'string' },
          eventDate: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              required: ['itemId', 'quantity'],
              properties: {
                itemId: { type: 'number' },
                quantity: { type: 'number' }
              }
            }
          }
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
    handler: orderHandlers.createOrder
  });

  fastify.route({
    method: 'PUT',
    url: `${SERVER.API_ROUTE.V1}/order/:id`,
    schema: {
      summary: 'Update order',
      description: 'Update order properties.',
      body: {
        type: 'object',
        properties: {
          customerName: { type: 'string' },
          address: { type: 'string' },
          eventDate: { type: 'string' },
          returnedAt: { type: 'string' },
          isCancelled: { type: 'boolean' }
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
    handler: orderHandlers.updateOrder
  });

  fastify.route({
    method: 'DELETE',
    url: `${SERVER.API_ROUTE.V1}/order/:id`,
    schema: {
      summary: 'Delete orders',
      description: 'Delete order by Id.',
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
    handler: orderHandlers.deleteOrderById
  });
};
