const MysqlConnectionOptions = require('typeorm/driver/mysql/MysqlConnectionOptions').MysqlConnectionOptions;

require('dotenv').config();

const options = {
  type: 'mysql',
  host: process.env.DATABASE_HOST, 
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASSWORD, 
  database: process.env.DATABASE_NAME, 
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
  // 本番環境でSSLが必要な場合は以下のオプションを追加
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : null,
};

module.exports = options;