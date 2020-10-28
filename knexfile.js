/**
 * This is a configuration file for Knex. We tell it how to
 * connect to the database in two different environments:
 *
 * 1. Our local computer, the "development" environment
 * 2. Heroku, the "production" environment
 */

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/social_wall_development',
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
