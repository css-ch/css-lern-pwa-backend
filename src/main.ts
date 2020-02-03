import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cors from 'cors';
import bodyParser = require('body-parser');
import expressSession = require('express-session');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
    }));
    app.use(bodyParser.json());
    app.use(expressSession({
        secret: 'why does the meme look like it was stuck in a microwave',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false,
        },
    }));
    await app.listen(3000);
}

bootstrap();
