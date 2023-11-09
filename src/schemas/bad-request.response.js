'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify) {
  fastify.addSchema({
    $id: 'badRequestResponse',
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    definition: 'Response when the request data is not valid',
    properties: {
      statusCode: { type: 'number' },
      error: { type:'string' },
      message: { type: 'string' }
    }
  })
})
