import {EntityRepository} from 'typeorm';
import {FavoriteEntity} from '../../core/entities/favorite/favorite.entity';
import {ProductEntity} from '../../core/entities/product/product.entity';
import {Product} from '../../core/types/product.type';
import {PersonalDataEntity} from '../../core/entities/personal-data/personal-data.entity';
import {PersonalData} from '../../core/types/personal-data.type';

@EntityRepository(FavoriteEntity)
export class FavoriteRepository {

    async addProductToFavorites(user, product) {
        const newFavorite = new FavoriteEntity();
        newFavorite.product = this.productToEntity(product);
        newFavorite.user = this.userToEntity(user);
        await newFavorite.save();
    }

    productToEntity(product: Product) {
        const newProductEntity = new ProductEntity();
        newProductEntity.type = product.type;
        newProductEntity.brand = product.brand;
        newProductEntity.color = product.brand;
        newProductEntity.image = product.image;
        newProductEntity.name = product.name;
        newProductEntity.price = product.price;
        newProductEntity.id = product.id;
        return newProductEntity;
    }

    async getFavoritesForUser(user: PersonalData) {
        const favoriteEntities = await FavoriteEntity
            .createQueryBuilder('favorite')
            .where('favorite.user.id = :user', {user: user.id})
            .getMany();
        return {
            favoriteEntities,
        };
    }

    userToEntity(user: PersonalData) {
        const newPersonalDataEntity = new PersonalDataEntity();
        newPersonalDataEntity.uid = user.uid;
        newPersonalDataEntity.city = user.city;
        newPersonalDataEntity.postcode = user.postcode;
        newPersonalDataEntity.fullname = user.fullname;
        newPersonalDataEntity.address = user.address;
        newPersonalDataEntity.id = user.id;
        return newPersonalDataEntity;
    }
}
