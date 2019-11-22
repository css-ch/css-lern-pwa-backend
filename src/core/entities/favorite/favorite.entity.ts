import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from '../product/product.entity';
import {PersonalDataEntity} from '../personal-data/personal-data.entity';

@Entity('favorite')
export class FavoriteEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => PersonalDataEntity, user => user.favorites)
    user: PersonalDataEntity;

    @ManyToOne(type => ProductEntity, product => product.favoredBy)
    product: ProductEntity;
}