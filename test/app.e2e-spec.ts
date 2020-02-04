import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';

describe('AppController (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Pong');
    });

    it('/product/find/:name (GET)', () => {
        return request(app.getHttpServer())
            .get('/product/find/kyrie')
            .expect(200)
            // tslint:disable-next-line:max-line-length
            .expect('{"productEntities":[{"id":1,"name":"Kyrie Flytrap II","price":76.95,"color":"Schwarz","image":"https://amp.sportscheck.com/i/sportscheck/D1000010011383255/nike-kyrie-flytrap-ii-basketballschuhe-herren-black-metallic-gold-anthracite?w=800&h=800&qlt=70&unsharp=(0,1,1,7)&fmt=webp","brand":"Nike","type":"Basketballschuhe"}]}');
    });

    it('/product/:type/:brand/:color (GET)', () => {
        return request(app.getHttpServer())
            .get('/product/any/Nike/any')
            .expect(200)
            // tslint:disable-next-line:max-line-length
            .expect('{"productEntities":[{"id":1,"name":"Kyrie Flytrap II","price":76.95,"color":"Schwarz","image":"https://amp.sportscheck.com/i/sportscheck/D1000010011383255/nike-kyrie-flytrap-ii-basketballschuhe-herren-black-metallic-gold-anthracite?w=800&h=800&qlt=70&unsharp=(0,1,1,7)&fmt=webp","brand":"Nike","type":"Basketballschuhe"}]}');
    });

    it('/personal-data/:uid (GET)', () => {
        return request(app.getHttpServer())
            .get('/personal-data/mUX81CUYUIfHjuDrGlRLSLSESlr2')
            .expect(200)
            .expect('{"id":1,"fullname":"David Gataric","address":"Ennetbürgerstrasse 4","postcode":"6374","city":"Buochs","uid":"mUX81CUYUIfHjuDrGlRLSLSESlr2"}');
    });

    it('/favorite/:uid (GET)', () => {
        return request(app.getHttpServer())
            .get('/favorite/mUX81CUYUIfHjuDrGlRLSLSESl2')
            .expect(200)
            .expect('[]');
    });
});
