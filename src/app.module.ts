import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonalDataController } from './personal-data/personal-data.controller';
import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PersonalDataRepository} from './persistence/personal-data/personal-data-repository.service';
import {ProductRepository} from './persistence/product/product-repository.service';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'pwa_bay_mysql',
          entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),

  ],
  controllers: [AppController, PersonalDataController, ProductController],
  providers: [
      AppService,
      PersonalDataRepository,
      ProductRepository,
  ],
})
export class AppModule {}
