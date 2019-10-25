import {Controller, Get, Param} from '@nestjs/common';
import {ProductRepository} from '../persistence/product/product-repository.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productRepo: ProductRepository) {}

    @Get(':name')
    async getPersonalDataByUID(@Param('name') name: string) {
        return await this.productRepo.getProductDataByName(name);
    }


}
