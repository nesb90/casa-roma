const { SERVER } = require('../config');
const autoload = require('@fastify/autoload');
const path = require('path');
const fastify = require('fastify')({ logger: { level: 'info' } });

function launchServer (fastify, host, port) {
  fastify.listen({ host, port }, function (error, address) {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    };
  })
}

;(async () => {
  fastify.register(autoload, {
    dir: path.join(__dirname, '../plugins')
  });

  fastify.register(autoload, {
    dir: path.join(__dirname, '../schemas')
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, '../routes')
  });

  launchServer(fastify, SERVER.host, SERVER.port);

  await fastify.ready()
})();
