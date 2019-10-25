import { EntityRepository } from 'typeorm';
import {PersonalDataEntity} from '../../entities/personal-data/personal-data.entity';
import {PersonalData} from '../../types/personal-data.type';

@EntityRepository(PersonalDataEntity)
export class PersonalDataRepository {

    constructor() {}

    async getPersonalDataByUID(uidToFind: string) {
        const personalDataEntity = await PersonalDataEntity.findOne({ uid: uidToFind });
        return {
            id: personalDataEntity.id,
            fullname: personalDataEntity.fullname,
            address: personalDataEntity.address,
            postcode: personalDataEntity.postcode,
            city: personalDataEntity.city,
            uid: personalDataEntity.uid,
        };
    }

    async createPersonalData(personalData: PersonalData) {
        const newPersonalData = new PersonalDataEntity();
        newPersonalData.fullname = personalData.fullname;
        newPersonalData.address = personalData.address;
        newPersonalData.postcode = personalData.postcode;
        newPersonalData.city = personalData.city;
        await newPersonalData.save();
    }
}
