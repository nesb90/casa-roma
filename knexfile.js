const { POSTGRES } = require('./src/config')

module.exports = {
  client: POSTGRES.CLIENT,
  connection: POSTGRES.CONFIG,
  migrations: {
    schemaName: POSTGRES.SCHEMA,
    tableName: 'migrations'
  }
}
