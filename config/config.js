import {Sequelize} from 'sequelize';
import * as dotenv from "dotenv";
import 'dotenv/config';
import {searchEnv} from "../util/functions/searchEnv.js";

dotenv.config({ path: searchEnv() });

let postgresConnection = {};

if (process.env.NODE_ENV === 'production') {
    postgresConnection = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: false
        }
    });
} else {
    postgresConnection = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: false
        }
    });
}

export default {
    postgresConnection
}
