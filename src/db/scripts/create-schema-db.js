const { POSTGRES } = require('../../config')

const pg = require('knex')({
  client: POSTGRES.CLIENT,
  connection: POSTGRES.CONFIG
})

async function schemaSync () {
  try {
    await pg.raw(`CREATE SCHEMA IF NOT EXISTS ${POSTGRES.SCHEMA}`)
    console.log(`Schema '${POSTGRES.SCHEMA}' created successfully!`)
    process.exit(0)
  } catch (error) {
    console.error('Failed to create schema', error)
  }
}

schemaSync()
