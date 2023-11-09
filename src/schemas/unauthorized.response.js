'use strict'

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify) {
  fastify.addSchema({
    $id: 'unauthorizedResponse',
    type: 'object',
    required: ['statusCode', 'error', 'message'],
    definition: 'Response when the request is not authorized',
    properties: {
      statusCode: { type: 'number' },
      error: { type:'string' },
      message: { type: 'string' }
    }
  })
})
