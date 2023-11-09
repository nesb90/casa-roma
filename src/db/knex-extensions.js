class KnexExtensions {
  constructor (knex) {
    this.knex = knex
  }

  async createTable (tableName, callback, schemaName) {
    let queryBuilder = this.knex.schema

    if (schemaName) {
      queryBuilder = queryBuilder.withSchema(schemaName)
    }

    await queryBuilder.createTable(tableName, callback.bind(this))
  }

  async alterTable (tableName, callback, schemaName) {
    let queryBuilder = this.knex.schema

    if (schemaName) {
      queryBuilder = queryBuilder.withSchema(schemaName)
    }

    await queryBuilder.alterTable(tableName, callback.bind(this))
  }

  getTableReferenceWithSchema (tableName, schemaName) {
    return schemaName ? `${schemaName}.${tableName}` : tableName
  }
}

module.exports = KnexExtensions
