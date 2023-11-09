class DBClient {
  constructor (client) {
    this._client = client
  }

  startTransaction () {
    return this._client.query('START TRANSACTION')
  }

  rollback () {
    return this._client.query('ROLLBACK')
  }

  commit () {
    return this._client.query('COMMIT')
  }

  release () {
    return this._client.release()
  }

  async query (sql, params = []) {
    const { rows } = await this._client.query(sql, params)
    console.debug(`Query result: ${JSON.stringify(rows)}`)
    return rows
  }
}

module.exports = DBClient
