import {EntityRepository} from 'typeorm';
import {ProductEntity} from '../../core/entities/product/product.entity';
import {FavoriteEntity} from "../../core/entities/favorite/favorite.entity";
import {PushEntity} from "../../core/entities/push/push.entity";

const webPush = require('web-push');

@EntityRepository(ProductEntity)
export class ProductRepository {

    async getProductDataByName(nameToFind: string) {
        const productEntities = await ProductEntity
            .createQueryBuilder('product')
            .where('product.name ILIKE :name', {name: '%' + nameToFind + '%'})
            .getMany();
        return {
            productEntities,
        };
    }

    async getProductDataByTypeBrandColor(typeToSearch: string, brandToSearch: string, colorToSearch: string) {
        const productEntities = await ProductEntity
            .createQueryBuilder('product')
            .where('product.brand = :brand', {brand: brandToSearch})
            .orWhere('product.type = :type', {type: typeToSearch})
            .orWhere('product.color = :color', {color: colorToSearch})
            .getMany();
        return {
            productEntities,
        };
    }

    async getAllProducts() {
        return await ProductEntity.query(`SELECT *
                                          FROM product`);
    }

    async getProductNames() {
        const productNames = [];
        let products = [];
        await ProductEntity.query(`SELECT *
                                   FROM product`).then(product => {
            products = product;
        });

        products.forEach(product => {
            productNames.push(product.name);
        });

        return productNames;
    }

    async getRandomProduct() {
        const product = await ProductEntity.query(`SELECT *
                                                   FROM product
                                                   ORDER BY random()
                                                   LIMIT 1`);

        return product[0];
    }

    async changePrice(data) {
        const product = await ProductEntity.findOne({id: data.productId});
        product.price = data.newPrice;
        await product.save();

        const favorites = await FavoriteEntity
            .createQueryBuilder('favorite')
            .where('favorite.product = :product', {product: data.productId})
            .leftJoinAndSelect('favorite.user', 'user')
            .where('user.id = favorite.user.id')
            .getMany();

        favorites.forEach(async (favorite) => {
            const push = await PushEntity
                .createQueryBuilder('push')
                .where('push.personalData = :user', {user: favorite.user.id})
                .getOne();
            const subscription = {
                endpoint: push.endpoint,
                keys: {
                    p256dh: push.p256dh,
                    auth: push.auth,
                },
            };

            const payload = {
                notification: {
                    title: 'Preisänderung',
                    body: 'Ein favorisiertes Produkt von dir hat einen neuen Preis!',
                },
            };

            webPush.sendNotification(
                subscription,
                JSON.stringify(payload)
            );
        });
    }
}
