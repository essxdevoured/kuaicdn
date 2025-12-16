import { Sequelize } from 'sequelize';

const database = new Sequelize(process.env.DB_NAME || 'file_share_db', process.env.DB_USER || 'user', process.env.DB_PASSWORD || 'password', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', // or 'mysql', 'sqlite', etc.
    logging: false,
});

export default database;