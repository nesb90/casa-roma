'use strict'

const { SERVER } = require('../config');
const stockHandlers = require('./handlers/stock.handler')

module.exports = async function stock (fastify) {
  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/stock/:id`,
    schema: {
      summary: 'Get single stock',
      description: 'Get an stock by id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['id', 'itemId', 'total', 'initialStock'],
          type: 'object',
          properties: {
            id: { type: 'number' },
            itemId: { type: 'number' },
            total: { type: 'number' },
            initialStock: { type: 'number' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: stockHandlers.getStockById
  });

  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/stock`,
    schema: {
      summary: 'Get stocks',
      description: 'Get all stocks.',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'itemId', 'total', 'initialStock'],
            type: 'object',
            properties: {
              id: { type: 'number' },
              itemId: { type: 'number' },
              total: { type: 'number' },
              initialStock: { type: 'number' }
            }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: stockHandlers.getStock
  });

  fastify.route({
    method: 'POST',
    url: `${SERVER.API_ROUTE.V1}/stock`,
    schema: {
      summary: 'Create stock',
      description: 'Create a new stock.',
      body: {
        type: 'object',
        required: ['itemId', 'total', 'initialStock'],
        type: 'object',
        properties: {
          itemId: { type: 'number' },
          total: { type: 'number' },
          initialStock: { type: 'number' }
        }
      },
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
    handler: stockHandlers.createStock
  });

  fastify.route({
    method: 'PUT',
    url: `${SERVER.API_ROUTE.V1}/stock/:id`,
    schema: {
      summary: 'Update stocks',
      description: 'Update stock total.',
      body: {
        type: 'object',
        type: 'object',
        properties: {
          itemId: { type: 'number' },
          total: { type: 'number' },
          initialStock: { type: 'number' }
        }
      },
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
    handler: stockHandlers.updateStock
  });

  fastify.route({
    method: 'DELETE',
    url: `${SERVER.API_ROUTE.V1}/stock/:id`,
    schema: {
      summary: 'Delete stocks',
      description: 'Delete stock by Id.',
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
    handler: stockHandlers.deleteStock
  });
};
