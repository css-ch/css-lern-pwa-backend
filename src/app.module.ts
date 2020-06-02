import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PersonalDataController} from './controllers/personal-data/personal-data.controller';
import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PersonalDataRepository} from './services/personal-data/personal-data-repository.service';
import {ProductRepository} from './services/product/product-repository.service';
import {ProductController} from './controllers/product/product.controller';
import {FavoriteRepository} from './services/favorite/favorite-repository.service';
import {FavoriteController} from './controllers/favorite/favorite.controller';
import {ShoppingCartController} from './controllers/shopping-cart/shopping-cart.controller';
import {ShoppingCartRepository} from './services/shopping-cart/shopping-cart-repository.service';
import {PaymentController} from './controllers/payment/payment.controller';
import {PaymentRepository} from './services/payment/payment-repository.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 20000,
            maxRedirects: 5,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost', // prod -> mysql | dev -> localhost
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'pwa_bay_postgres',
            keepConnectionAlive: true,
            entities: [__dirname + '/core/entities/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),

    ],
    controllers: [AppController, PersonalDataController, ProductController, FavoriteController, ShoppingCartController, PaymentController],
    providers: [
        AppService,
        PersonalDataRepository,
        ProductRepository,
        FavoriteRepository,
        ShoppingCartRepository,
        PaymentRepository,
    ],
})
export class AppModule {
}
