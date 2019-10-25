import {Controller, Get, Param} from '@nestjs/common';
import {ProductRepository} from '../persistence/product/product-repository.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productRepo: ProductRepository) {}

    @Get(':name')
    async getProductDataByName(@Param('name') name: string) {
        return await this.productRepo.getProductDataByName(name);
    }

    @Get(':type/:brand/:color')
    async getProductDataByTypeBrandColor(@Param('type') type: string,
                                @Param('brand') brand: string,
                                @Param('color') color: string) {
        return await this.productRepo.getProductDataByTypeBrandColor(type, brand, color);
    }

}
