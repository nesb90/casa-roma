const { Pool } = require('pg')
const DBClient = require('./db.client')

class DBPool {
  constructor(config, maxConn) {
    this._config = config
    const poolConfig = {
      ...config,
      idleTimeoutMillis: 20000,
      max: maxConn
    }
    this._pool = new Pool(poolConfig)
  }

  async getClient () {
    const client = await this._pool.connect()
    return new DBClient(client)
  }

  async close () {
    await this._pool.end()
  }
}

module.exports = DBPool
