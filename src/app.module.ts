import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PersonalDataController} from './controllers/personal-data/personal-data.controller';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PersonalDataRepository} from './services/personal-data/personal-data-repository.service';
import {ProductRepository} from './services/product/product-repository.service';
import {ProductController} from './controllers/product/product.controller';
import {FavoriteRepository} from './services/favorite/favorite-repository.service';
import {FavoriteController} from './controllers/favorite/favorite.controller';
import {ShoppingCartController} from './controllers/shopping-cart/shopping-cart.controller';
import {ShoppingCartRepository} from './services/shopping-cart/shopping-cart-repository.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3307,
            username: 'root',
            password: 'root',
            database: 'pwa_bay_mysql',
            keepConnectionAlive: true,
            entities: [__dirname + '/core/entities/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),

    ],
    controllers: [AppController, PersonalDataController, ProductController, FavoriteController, ShoppingCartController],
    providers: [
        AppService,
        PersonalDataRepository,
        ProductRepository,
        FavoriteRepository,
        ShoppingCartRepository,
    ],
})
export class AppModule {
}
