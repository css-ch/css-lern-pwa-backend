import {EntityRepository} from 'typeorm';
import {FavoriteEntity} from '../../core/entities/favorite/favorite.entity';
import {ProductEntity} from '../../core/entities/product/product.entity';
import {PersonalDataEntity} from '../../core/entities/personal-data/personal-data.entity';

@EntityRepository(FavoriteEntity)
export class FavoriteRepository {

    async toggleFavorite(userid: number, productid: number) {
        if (await this.checkIfAlreadyFavored(userid, productid)) {
            await this.deleteFavorite(userid, productid);
        } else {
            await this.addFavorite(userid, productid);
        }
    }

    private async checkIfAlreadyFavored(userId: number, productId: number): Promise<boolean> {
        const favoriteEntityCount = await FavoriteEntity
            .createQueryBuilder('favorite')
            .where('favorite.user.id = :userid', {userid: userId})
            .andWhere('favorite.product.id = :productid', {productid: productId})
            .getCount();

        return favoriteEntityCount === 1;
    }

    async getFavoritesFromUser(uidFromUser: string) {
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

    private async addFavorite(userid: number, productid: number) {
        const newFavorite = new FavoriteEntity();
        newFavorite.product = await ProductEntity.findOne({id: productid});
        newFavorite.user = await PersonalDataEntity.findOne({id: userid});
        await newFavorite.save();
    }

    async getFavoriteCountForUser(uidFromUser: string) {
        const favoriteCount = await FavoriteEntity
            .createQueryBuilder('favorite')
            .leftJoinAndSelect('favorite.user', 'user')
            .where('user.uid = :uid', {uid: uidFromUser})
            .leftJoinAndSelect('favorite.product', 'product')
            .getCount();

        return favoriteCount;
    }
}
