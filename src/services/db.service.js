class DBService {
  constructor(dbPool) {
    this.dbPool = dbPool
  }

  async doQuery (sql, params = []) {
    let dbClient

    try {
      dbClient = await this.dbPool.getClient()
      return await dbClient.query(sql, params)
    } catch (error) {
      console.error(`Something went wrong wile executing query '${sql}' with params '${params}'`, error)
      throw error
    } finally {
      dbClient && dbClient.release()
    }
  }
}

module.exports = DBService
