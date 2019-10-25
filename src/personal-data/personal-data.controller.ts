import {Controller, Get, Param, Post} from '@nestjs/common';
import {PersonalDataRepository} from '../persistence/personal-data/personal-data-repository.service';
import {PersonalData} from '../types/personal-data.type';

@Controller('personal-data')
export class PersonalDataController {

    constructor(private readonly personalDataRepo: PersonalDataRepository) {}

    @Get(':uid')
    async getPersonalDataByUID(@Param('uid') uid: string) {
        return await this.personalDataRepo.getPersonalDataByUID(uid);
    }

    @Post(':personal-data')
    async createPersonlData(@Param('personal-data') personalData: PersonalData) {
       await this.personalDataRepo.createPersonalData(personalData);
    }

}
