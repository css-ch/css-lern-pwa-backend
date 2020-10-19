import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PersonalDataEntity} from "../personal-data/personal-data.entity";

@Entity('push')
export class PushEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 300})
    endpoint: string;

    @Column({length: 100})
    p256dh: string;

    @Column({length: 100})
    auth: string;

    @OneToOne(type => PersonalDataEntity)
    @JoinColumn()
    personalData: PersonalDataEntity;
}
