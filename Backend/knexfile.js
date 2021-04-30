require('dotenv').config()

module.exports = {

  production: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/database.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
  development
  : {
    client: 'pg',

    connection: {
      host:process.env.POSTGRESQL_ELEPHANT_HOST,
      database:process.env.POSTGRESQL_ELEPHANT_DATABASE,
      user: process.env.POSTGRESQL_ELEPHANT_USER,
      password: process.env.POSTGRESQL_ELEPHANT_PASSWORD,

    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
