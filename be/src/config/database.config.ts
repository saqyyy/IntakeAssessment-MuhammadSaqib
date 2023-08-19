import { registerAs } from '@nestjs/config'


export default registerAs('database', () => ({
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
        ? Number.parseInt(process.env.DATABASE_PORT, 10)
        : 3606, //default port for mysql
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    synchronize: true,
    logging: process.env.NODE_ENVIRONMENT === 'production' ? false : true,
    ssl: process.env.NODE_ENVIRONMENT === 'production' ? true : false,
}));
