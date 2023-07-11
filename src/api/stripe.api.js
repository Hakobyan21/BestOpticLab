// NPM Modules
import express from 'express';

import process from 'process';
// Local Modules
import { UsersController } from '../controller';
import UsersValidation from '../middlewares/validation/users.validation';
// import AuthMiddlaware from '../auth/auth.middlware';
// import { UsersValidationMiddleware } from '../middlewares/validation';
// import { ImageUploadMiddleware } from '../middlewares/image-upload.middleware';


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
        name: 'stripe-samples/accept-a-payment/payment-element',
        version: '0.0.2',
        url: 'https://github.com/stripe-samples'
    } 
});


const router = express.Router();


router.get('/', (req, res) => {
    const path = resolve(process.env.STATIC_DIR + '/index.html');
    res.sendFile(path);
    console.log('11');
});
router.get('/config', (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
}
    
);
router.get('/create-payment-intent/:amount', async (req, res) => {
    console.log('3333');
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    try {
        const amount = req.params.amount;
        console.log(amount);
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'USD',
            amount: amount * 100,
            automatic_payment_methods: { enabled: true }
        });
        console.log(paymentIntent);
        console.log(paymentIntent.client_secret);
        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});


export default router;
