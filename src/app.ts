import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import imageRouter from './routes/imageRouter';
import morgan from 'morgan';

dotenv.config();

const whitelist = [process.env.WHITELIST];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlewares();
        this.router();
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, '../imagens')));
    }

    router() {
        this.app.use('/image', imageRouter);
    }
}

export default new App().app;
