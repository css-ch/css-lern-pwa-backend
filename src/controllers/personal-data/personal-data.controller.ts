import {Body, Controller, Get, Logger, Param, Post, Put} from '@nestjs/common';
import {PersonalDataRepository} from '../../services/personal-data/personal-data-repository.service';
import {PersonalData} from '../../core/types/personal-data.type';

@Controller('personal-data')
export class PersonalDataController {

    constructor(private readonly personalDataRepo: PersonalDataRepository) {
    }

    @Get(':uid')
    async getPersonalDataByUID(@Param('uid') uid: string) {
        return await this.personalDataRepo.getPersonalDataByUID(uid);
    }

    @Post('create')
    async createPersonlData(@Body() personalData: PersonalData) {
        await this.personalDataRepo.createPersonalData(personalData);
    }

    @Put('change')
    async changePersonalData(@Body() personalData: PersonalData) {
        await this.personalDataRepo.changePersonalData(personalData);
    }

}
