import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Product} from '../../core/types/product.type';
import {Request, Response} from 'express';

/**
 * Keep the ts-ignore until build fixed
 */
@Controller('shopping-cart')
export class ShoppingCartController {

    @Get()
    getCart(@Req() req: Request, @Res() res: Response) {
        if (!req.session.cart) {
            req.session.cart = [] as Product[];
        }

        // @ts-ignore
        res.json(req.session.cart);
    }

    @Post('add')
    addToCart(@Req() req: Request, @Res() res: Response, @Body() product: Product) {

        if (req.session.cart === undefined) {
            req.session.cart = [] as Product[];
        }
        req.session.cart = [
            ...req.session.cart,
            req.body as Product,
        ] as Product[];

        // @ts-ignore
        res.sendStatus(200);
    }

    @Post('empty')
    emptyCart(@Req() req: Request, @Res() res: Response) {
        req.session.cart = [];
        // @ts-ignore
        res.sendStatus(200);
    }

    @Post('remove')
    removeItem(@Req() req: Request, @Res() res: Response, @Body() product) {
        this.removeItemFromCart(product, req);

        // @ts-ignore
        res.sendStatus(200);
    }

    private removeItemFromCart(product: Product, req: Request) {
        let index = 0;
        for (const productInCart of req.session.cart) {
            if (productInCart.name === product.name) {
                req.session.cart.splice(index, 1);
                break;
            }
            index++;
        }
    }
}
