'use strict'

const { SERVER } = require('../config');
const paymentHandlers = require('./handlers/payment.handler');

module.exports = async function payment(fastify) {
  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/payment/:id`,
    schema: {
      summary: 'Single payment',
      description: 'Get a payment by id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['id', 'orderId', 'amount', 'payConcept', 'createdAt'],
          properties: {
            id: { type: 'number' },
            orderId: { type: 'number' },
            amount: { type: 'number' },
            payConcept: { type: 'string' },
            createdAt: { type: 'string' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: paymentHandlers.getPaymentById
  });

  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/payment`,
    schema: {
      summary: 'Get payments',
      description: 'Get all payments.',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'orderId', 'amount', 'payConcept', 'createdAt'],
            properties: {
              id: { type: 'number' },
              orderId: { type: 'number' },
              amount: { type: 'number' },
              payConcept: { type: 'string' },
              createdAt: { type: 'string' }
            }
          },
          400: { $ref: 'badRequestResponse#' },
          401: { $ref: 'unauthorizedResponse#' },
          404: { $ref: 'notFoundResponse#' },
          500: { $ref: 'systemErrorResponse#' }
        }
      }
    },
    handler: paymentHandlers.getPayments
  });

  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/order-payment/:orderId`,
    schema: {
      summary: 'Get order payments',
      description: 'Get all payments for an order.',
      response: {
        200: {
          type: 'object',
          required: ['orderTotal', 'currentBalance', 'payments'],
          properties: {
            currentBalance: { type: 'number' },
            orderTotal: { type: 'number' },
            payments: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'orderId', 'amount', 'payConcept', 'createdAt'],
                properties: {
                  id: { type: 'number' },
                  orderId: { type: 'number' },
                  amount: { type: 'number' },
                  payConcept: { type: 'string' },
                  createdAt: { type: 'string' }
                }
              }
            }
          },
          400: { $ref: 'badRequestResponse#' },
          401: { $ref: 'unauthorizedResponse#' },
          404: { $ref: 'notFoundResponse#' },
          500: { $ref: 'systemErrorResponse#' }
        }
      }
    },
    handler: paymentHandlers.getPaymentsByOrderId
  });

  fastify.route({
    method: 'POST',
    url: `${SERVER.API_ROUTE.V1}/payment`,
    schema: {
      summary: 'Create payment',
      description: 'Create a new payment.',
      consumes: ['application/json'],
      produces: ['application/json'],
      body: {
        type: 'object',
        required: ['orderId', 'amount', 'payConcept'],
        properties: {
          orderId: { type: 'number' },
          amount: { type: 'number' },
          payConcept: { type: 'string' }
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
    handler: paymentHandlers.createPayment
  });

  fastify.route({
    method: 'PUT',
    url: `${SERVER.API_ROUTE.V1}/payment/:id`,
    schema: {
      summary: 'Update payment',
      description: 'Update payment properties.',
      body: {
        type: 'object',
        properties: {
          amount: { type: 'number' },
          payConcept: { type: 'string' }
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
    handler: paymentHandlers.updatePayment
  });

  fastify.route({
    method: 'DELETE',
    url: `${SERVER.API_ROUTE.V1}/payment/:id`,
    schema: {
      summary: 'Delete payments',
      description: 'Delete payment by Id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['message'],
          type: 'object',
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
    handler: paymentHandlers.deletePaymentById
  });
};
