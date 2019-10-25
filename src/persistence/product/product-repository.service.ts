import { EntityRepository } from 'typeorm';
import {ProductEntity} from '../../entities/product/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository {

    async getProductDataByName(nameToFind: string) {
        const productEntities = await ProductEntity
            .createQueryBuilder('product')
            .where('product.name like :name', {name: '%' + nameToFind + '%' })
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
}
