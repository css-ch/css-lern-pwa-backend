import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('product')
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({type: 'float'})
    price: number;

    @Column({length: 20})
    color: string;

    @Column({length: 500})
    image: string;

    @Column({length: 50})
    brand: string;

    @Column({length: 50})
    type: string;
}
