'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify) {
  fastify.addSchema({
    $id: 'systemErrorResponse',
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    definition: 'Response when server system error occurs',
    properties: {
      statusCode: { type: 'number' },
      error: { type:'string' },
      message: { type: 'string' }
    }
  })
})
