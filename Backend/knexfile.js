// Update with your config settings.

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
      host:'tuffi.db.elephantsql.com',
      database: 'ctrjndpo',
      user: 'ctrjndpo',
      password: 'C7y4z2VowZcmXrLtwov5-5uzHhnwYiUQ',

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
