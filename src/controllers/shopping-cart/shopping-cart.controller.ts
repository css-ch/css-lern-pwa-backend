import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Product} from '../../core/types/product.type';
import {Request, Response} from 'express';

@Controller('shopping-cart')
export class ShoppingCartController {

    @Get()
    getCart(@Req() req: Request, @Res() res: Response) {
        if (req.session.cart === undefined) {
            req.session.cart = [] as Product[];
        }

        res.json(req.session.cart);
    }

    @Post('add')
    addToCart(@Req() req: Request, @Res() res: Response, @Body() product: Product) {
        // tslint:disable
        console.log(req.session.cart);
        if (req.session.cart === undefined) {
            req.session.cart = [] as Product[];
        }
        req.session.cart = [
            ...req.session.cart,
            req.body as Product,
        ] as Product[];

        // tslint:disable
        console.log(req.session.cart);
    }

    @Post('empty')
    emptyCart(@Req() req: Request, @Res() res: Response) {
        req.session.cart = [];
    }
}
