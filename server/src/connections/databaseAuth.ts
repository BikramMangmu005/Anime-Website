import { Sequelize } from 'sequelize';
import 'dotenv/config';

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error('Missing database environment variables');
}

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: Number(DB_PORT),
        dialect: 'postgres',
        logging: console.log,

    }
);

export default sequelize;



        