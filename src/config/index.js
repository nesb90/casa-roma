module.exports = {
  SERVER: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    secretKey: process.env.SECRET_KEY,
    API_ROUTE: {
      V1: '/api/v1'
    }
  },
  POSTGRES: require('./db.config'),
  NODE_ENV: process.env.NODE_ENV
}
