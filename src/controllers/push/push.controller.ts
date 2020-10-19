import {Body, Controller, Post, Res} from '@nestjs/common';
import {PushRepository} from "../../services/push/push-repository.service";

@Controller('push')
export class PushController {

    constructor(private readonly pushRepo: PushRepository) {
    }

    @Post('subscribe')
    async addProductToFavorites(@Res() res, @Body() data: any) {
        await this.pushRepo.subscribe(data.psObject).then(res.sendStatus(200));
    }
}
