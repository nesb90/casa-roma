'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify) {
  fastify.addSchema({
    $id: 'notFoundResponse',
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    definition: 'Response when the requested data is not found',
    properties: {
      statusCode: { type: 'number' },
      error: { type:'string' },
      message: { type: 'string' }
    }
  })
})
