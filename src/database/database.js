import { Sequelize } from "sequelize";
import {DB_PORT,DB_USER,DB_PASSWORD,DB_DATABASE, DB_HOST} from '../config/config.js'
export const sequelize = new Sequelize(
    DB_DATABASE,//nombre de la base de datos
    DB_USER,//usuario
    DB_PASSWORD,//contraseña de la base de datos
    {
        host: DB_HOST,
        dialect: 'postgres',
        port: DB_PORT ,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },

    });

