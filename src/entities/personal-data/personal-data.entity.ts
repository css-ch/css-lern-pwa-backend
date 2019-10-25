import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity('user')
export class PersonalDataEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 70})
    fullname: string;

    @Column({length: 50})
    address: string;

    @Column({length: 10})
    postcode: string;

    @Column({length: 50})
    city: string;

    @Column({length: 100})
    uid: string;
}