import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PaymentRepository} from '../../services/payment/payment-repository.service';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentRepo: PaymentRepository) {
    }

    @Post('make-payment/:amount/:customerId')
    async makePayment(@Param('amount') amount: number, @Param('customerId') stripeCustomerId: string) {
        await this.paymentRepo.pay(amount, stripeCustomerId);
    }

    @Post('create-customer')
    async createStripeCustomer(@Body() data: any) {
        await this.paymentRepo.createCustomer(data.user, data.email);
    }

    @Get('get-payments/:customerId')
    async getPayments(@Param('customerId') stripeCustomerId: string) {
        return await this.paymentRepo.getPayments(stripeCustomerId);
    }
}
