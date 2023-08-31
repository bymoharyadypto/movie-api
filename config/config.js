require('dotenv').config();
module.exports = {
  development: {
    username: process.env.POSTGRESQL_DEV_USER,
    password: process.env.POSTGRESQL_DEV_PASSWORD,
    database: process.env.POSTGRESQL_DEV_DB_NAME,
    host: process.env.POSTGRESQL_DEV_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRESQL_TEST_USER,
    password: process.env.POSTGRESQL_TEST_PASSWORD,
    database: process.env.POSTGRESQL_TEST_DB_NAME,
    host: process.env.POSTGRESQL_TEST_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DB_NAME,
    host: process.env.POSTGRESQL_HOST,
    dialect: 'postgres',
  },
};
