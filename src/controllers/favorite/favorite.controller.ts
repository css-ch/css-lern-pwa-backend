import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {FavoriteRepository} from '../../services/favorite/favorite-repository.service';
import {PersonalData} from '../../core/types/personal-data.type';

@Controller('favorite')
export class FavoriteController {

    constructor(private readonly favoriteRepo: FavoriteRepository) {
    }

    @Post('add-favorite')
    async addProductToFavorites(@Body() data: any) {
        await this.favoriteRepo.addProductToFavorites(data.user, data.product);
    }

    @Get(':userid')
    async getFavoritesForUser(@Param('userid') user: PersonalData) {
        return await this.favoriteRepo.getFavoritesForUser(user);
    }

}
