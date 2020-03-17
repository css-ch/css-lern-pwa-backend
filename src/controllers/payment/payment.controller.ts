import {Controller, Param, Post} from '@nestjs/common';
import {PaymentRepository} from '../../services/payment/payment-repository.service';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentRepo: PaymentRepository) {
    }

    @Post('make-payment/:amount')
    async addProductToFavorites(@Param('amount') amount: number) {
        await this.paymentRepo.pay(amount);
    }

    @Post('create-customer')
    async createStripeCustomer(/*@Body() data: any*/) {
        return await this.paymentRepo.createCustomer();
    }
}
