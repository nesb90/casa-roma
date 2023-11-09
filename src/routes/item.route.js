'use strict'

const { SERVER } = require('../config');
const itemHandlers = require('./handlers/item.handler')

module.exports = async function item(fastify) {
  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/item/:id`,
    schema: {
      summary: 'Get single item',
      description: 'Get an item by id.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'object',
          required: ['id', 'name', 'description', 'rentPrice', 'itemPrice'],
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            rentPrice: { type: 'number' },
            itemPrice: { type: 'number' }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: itemHandlers.getItemById
  });

  fastify.route({
    method: 'GET',
    url: `${SERVER.API_ROUTE.V1}/item`,
    schema: {
      summary: 'Get items',
      description: 'Get all items.',
      produces: ['application/json'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name', 'description', 'rentPrice', 'itemPrice'],
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: 'string' },
              rentPrice: { type: 'number' },
              itemPrice: { type: 'number' }
            }
          }
        },
        400: { $ref: 'badRequestResponse#' },
        401: { $ref: 'unauthorizedResponse#' },
        404: { $ref: 'notFoundResponse#' },
        500: { $ref: 'systemErrorResponse#' }
      }
    },
    handler: itemHandlers.getItems
  });

  fastify.route({
    method: 'POST',
    url: `${SERVER.API_ROUTE.V1}/item`,
    schema: {
      summary: 'Create Item',
      description: 'Create a new item.',
      consumes: ['application/json'],
      produces: ['application/json'],
      body: {
        type: 'object',
        required: ['name', 'description', 'rentPrice', 'itemPrice'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          rentPrice: { type: 'number' },
          itemPrice: { type: 'number' }
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
    handler: itemHandlers.createItem
  });

  fastify.route({
    method: 'PUT',
    url: `${SERVER.API_ROUTE.V1}/item/:id`,
    schema: {
      summary: 'Update items',
      description: 'Update item properties.',
      consumes: ['application/json'],
      produces: ['application/json'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          rentPrice: { type: 'number' },
          itemPrice: { type: 'number' }
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
    handler: itemHandlers.updateItem
  });

  fastify.route({
    method: 'DELETE',
    url: `${SERVER.API_ROUTE.V1}/item/:id`,
    schema: {
      summary: 'Delete items',
      description: 'Delete item by Id.',
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
    handler: itemHandlers.deleteItemById
  });
};
