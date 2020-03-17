import {Injectable} from '@nestjs/common';
import Stripe from 'stripe';
// tslint:disable-next-line:no-var-requires
const stripe = require('stripe')('sk_test_VeIBhAZZoWVXGxEffCVFupMW00KFLbNNGJ');


@Injectable()
export class PaymentRepository {

    async pay(amountInChf: number) {
        const params: Stripe.ChargeCreateParams = {
            amount: amountInChf,
            customer: 'cus_GvTvjcXTLgKuW3',
            currency: 'chf',
        };

        stripe.charges.create(params);
    }

    async createCustomer() {
        stripe.customers.create({
            email: 'toImplement@toImplement.com',
        });
    }
}
