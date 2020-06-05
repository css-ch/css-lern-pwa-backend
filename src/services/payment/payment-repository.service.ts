import {Injectable} from '@nestjs/common';
import Stripe from 'stripe';
import {PersonalDataEntity} from '../../core/entities/personal-data/personal-data.entity';
// tslint:disable-next-line:no-var-requires
const stripe = require('stripe')('sk_test_VeIBhAZZoWVXGxEffCVFupMW00KFLbNNGJ');

@Injectable()
export class PaymentRepository {

    async pay(amountInChf: number, stripeCustomerId: string) {
        const params: Stripe.ChargeCreateParams = {
            amount: amountInChf,
            customer: stripeCustomerId,
            currency: 'chf',
        };

        await stripe.charges.create(params);
    }

    async refund(paymentId: string) {
        const params: Stripe.RefundCreateParams = {
            charge: paymentId,
        };

        await stripe.refunds.create(params);
    }

    async createCustomer(userData, userEmail) {
        stripe.customers.create({
            email: userEmail,
            description: 'PWABay Customer',
            name: userData.fullname,
            // ToDo: pass card token later when UI ready
            source: 'tok_visa',
        }).then(async customer => {
            const personalDataEntity = await PersonalDataEntity.findOne({id: userData.id});
            personalDataEntity.stripeId = customer.id;
            personalDataEntity.save();
        });
    }

    async getPayments(stripeCustomerId: string) {
        return await stripe.charges.list({
            customer: stripeCustomerId,
        });
    }
}
