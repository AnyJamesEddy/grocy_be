import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import auth from "../src/services/grocy-authentication.js";

import bodyParser from 'body-parser';
import authenticationRoutes from "../routes/authentication/authentication-routes.js";
import userRoutes from "../routes/authentication/user-routes.js";
import {searchEnv} from "../util/functions/searchEnv.js";

dotenv.config({ path: searchEnv() });

const App = express();

App.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

App.use(bodyParser.json());

const port = process.env.PORT || 3000;

async function authenticate(port) {

    App.use(bodyParser.urlencoded({extended: false}));
    App.use(bodyParser.json());
    App.use(authenticationRoutes)
    App.use(userRoutes)

    // ************************************
    // AUTHENTICATION
    // ************************************

    if (auth) {
        try {
            await auth.syncDB();
        }
        catch (err) {
            console.log("Errore di avvio Autenticazione: ",err);
        }
        // auth.App.get('/', (req, res) => {
        //     auth.send('✅ Authentication is up and running!');
        // });
    }
    await App.listen(port);
}

authenticate(port).then();
