import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cors from 'cors';
import * as fs from 'fs';
import bodyParser = require('body-parser');
import expressSession = require('express-session');

const webPush = require('web-push');

async function bootstrap() {
    webPush.setVapidDetails(
        'mailto:1234@bruh.ch',
        'BBxl4HYXkZUsBE-POsCBVA4Xa333VJqQjswZmgxdfaL7h9KTXdETBFTgVz6S92oFi6q9XTWlvwIkzYyiE1eg6Us',
        'a_lY1Gs9DHPemSVuLj3EAoyPpFjj19OVBaeG_GOxEMQ'
    );
    const httpsOptions = {
        key: fs.readFileSync(__dirname + '/secrets/localhost.key'),
        cert: fs.readFileSync(__dirname + '/secrets/localhost.crt'),
    };
    const app = await NestFactory.create(AppModule, {
        httpsOptions,
    });
    app.use(cors({
        origin: 'https://pwa-bay.web.app',
        credentials: true,
    }));
    app.use(bodyParser.json());
    app.use(expressSession({
        secret: 'why does the meme look like it was stuck in a microwave',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
        },
    }));
    await app.listen(3000);
}

bootstrap();
