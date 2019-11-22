import {EntityRepository} from 'typeorm';
import {FavoriteEntity} from '../../core/entities/favorite/favorite.entity';
import {ProductEntity} from '../../core/entities/product/product.entity';
import {PersonalDataEntity} from '../../core/entities/personal-data/personal-data.entity';

@EntityRepository(FavoriteEntity)
export class FavoriteRepository {

    constructor() {
    }

    async addOrRemoveProductFavorites(user, product) {
        if (await this.checkIfAlreadyFavored(user.id, product.id)) {
            await this.deleteFavorite(user.id, product.id);
        } else {
            const newFavorite = new FavoriteEntity();
            newFavorite.product = await ProductEntity.findOne({id: product.id});
            newFavorite.user = await PersonalDataEntity.findOne({uid: user.uid});
            await newFavorite.save();
        }
    }

    private async checkIfAlreadyFavored(userId: number, productId: number): Promise<boolean> {
        const favoriteEntityCount = await FavoriteEntity
            .createQueryBuilder('favorite')
            .where('favorite.user.id = :userid', {userid: userId})
            .andWhere('favorite.product.id = :productid', {productid: productId})
            .getCount();
        if (favoriteEntityCount === 1) {
            return true;
        }
        return false;
    }

    async getFavoritesFromUser(uidFromUser) {
        const favorites = await FavoriteEntity
            .createQueryBuilder('favorite')
            .leftJoinAndSelect('favorite.user', 'user')
            .where('user.uid = :uid', {uid: uidFromUser})
            .leftJoinAndSelect('favorite.product', 'product')
            .getMany();
        return favorites;
    }

    private async deleteFavorite(userId: number, productId: number) {
        const favoriteEntity = await FavoriteEntity
            .createQueryBuilder('favorite')
            .where('favorite.user.id = :userid', {userid: userId})
            .andWhere('favorite.product.id = :productid', {productid: productId})
            .getOne();
        await favoriteEntity.remove();
    }
}
