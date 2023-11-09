const POSTGRES = {
  HOST: process.env.POSTGRES_HOST,
  PORT: process.env.POSTGRES_PORT,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DB,
  SCHEMA: process.env.POSTGRES_SCHEMA,
  SSL: process.env.POSTGRES_SSL === 'true',
  CLIENT: 'pg',
  CONFIG: {}
}

Object.assign(POSTGRES.CONFIG, {
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  user: POSTGRES.USER,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE
})

if (POSTGRES.SSL) {
  POSTGRES.CONFIG.ssl = { rejectUnauthorized: false }
}

module.exports = POSTGRES
