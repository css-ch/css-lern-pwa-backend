import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {ProductRepository} from '../../services/product/product-repository.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productRepo: ProductRepository) {
    }

    @Get('find/:name')
    async getProductDataByName(@Param('name') name: string) {
        return await this.productRepo.getProductDataByName(name);
    }

    @Get(':type/:brand/:color')
    async getProductDataByTypeBrandColor(@Param('type') type: string,
                                         @Param('brand') brand: string,
                                         @Param('color') color: string) {
        return await this.productRepo.getProductDataByTypeBrandColor(type, brand, color);
    }

    @Get('all')
    async getProducts() {
        return await this.productRepo.getAllProducts();
    }

    @Get('all/names')
    async getProductNames() {
        return await this.productRepo.getProductNames();
    }

    @Get('random')
    async getRandpomProduct() {
        return await this.productRepo.getRandomProduct();
    }

    @Post('change-price')
    async changePrice(@Res() res, @Body() data: any) {
        await this.productRepo.changePrice(data);
    }
}
