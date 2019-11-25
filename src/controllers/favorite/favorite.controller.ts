import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {FavoriteRepository} from '../../services/favorite/favorite-repository.service';

@Controller('favorite')
export class FavoriteController {

    constructor(private readonly favoriteRepo: FavoriteRepository) {
    }

    @Post('mutate-favorite')
    async addProductToFavorites(@Body() data: any) {
        await this.favoriteRepo.toggleFavorite(data.user, data.product);
    }

    @Get(':uid')
    async getFavoritesForUser(@Param('uid') uid: string) {
        return await this.favoriteRepo.getFavoritesFromUser(uid);
    }

}
