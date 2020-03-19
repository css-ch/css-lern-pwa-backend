import {EntityRepository} from 'typeorm';
import {PersonalDataEntity} from '../../core/entities/personal-data/personal-data.entity';
import {PersonalData} from '../../core/types/personal-data.type';
// tslint:disable-next-line:no-var-requires
const stripe = require('stripe')('sk_test_VeIBhAZZoWVXGxEffCVFupMW00KFLbNNGJ');

@EntityRepository(PersonalDataEntity)
export class PersonalDataRepository {

    async getPersonalDataByUID(uidToFind: string) {
        const personalDataEntity = await PersonalDataEntity.findOne({uid: uidToFind});
        try {
            return {
                id: personalDataEntity.id,
                fullname: personalDataEntity.fullname,
                stripeId: personalDataEntity.stripeId,
                address: personalDataEntity.address,
                postcode: personalDataEntity.postcode,
                city: personalDataEntity.city,
                uid: personalDataEntity.uid,
                favorites: personalDataEntity.favorites,
            };
        } catch (e) {
            return {};
        }
    }

    async createPersonalData(personalData: PersonalData) {
        const newPersonalData = new PersonalDataEntity();
        newPersonalData.fullname = personalData.fullname;
        newPersonalData.address = personalData.address;
        newPersonalData.postcode = personalData.postcode;
        newPersonalData.city = personalData.city;
        newPersonalData.uid = personalData.uid;
        await newPersonalData.save();
    }

    async changePersonalData(personalData: PersonalData) {
        const personalDataEntity = await PersonalDataEntity.findOne({uid: personalData.uid});
        personalDataEntity.fullname = personalData.fullname;
        personalDataEntity.address = personalData.address;
        personalDataEntity.postcode = personalData.postcode;
        personalDataEntity.city = personalData.city;
        personalDataEntity.uid = personalData.uid;
        await personalDataEntity.save();
    }
}
