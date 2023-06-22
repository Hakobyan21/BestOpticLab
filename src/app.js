// NPM Modules
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
const dotenv = require('dotenv');

// Load the environment variables from the .env file
const env = dotenv.config({ path: './.env' });
import stripe from 'stripe';

const stripeConfig = {
    apiVersion: '2020-08-27',
    appInfo: {
        name: 'stripe-samples/accept-a-payment/payment-element',
        version: '0.0.2',
        url: 'https://github.com/stripe-samples'
    }
};

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY, stripeConfig);


// Local modules
import config from './config/variables.config';
import PSQLStorage from './storage/psql.storage';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware';
import Api from './api';
import AuthMiddlaware from './auth/auth.middlware';
import {WrapMiddlwareUtil} from './utils';

import MessageHandler from './socket/message-handler';

import { LoggerUtil } from './utils';

const { DISABLE_REQUEST_LOG } = config;

class App {
    /* @constructor
   */
    constructor() {
        this.app = express();
        this.app.use(express.static(process.env.STATIC_DIR));
        this.app.use(
            express.json({
                // We need the raw body to verify webhook signatures.
                // Let's compute it only when hitting the Stripe webhook endpoint.
                verify: function (req, res, buf) {
                    if (req.originalUrl.startsWith('/webhook')) {
                        req.rawBody = buf.toString();
                    }
                },
            })
        );

        //STRIPE APIS
        this.app.get('/', (req, res) => {
            const path = resolve(process.env.STATIC_DIR + '/index.html');
            res.sendFile(path);
        });
  
        this.app.get('/config', (req, res) => {
            console.log(1)
            res.send({
                publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            });
        });
  
        this.app.get('/create-payment-intent', async (req, res) => {
            console.log('3333');
            console.log(res);
            // Create a PaymentIntent with the amount, currency, and a payment method type.
            //
            // See the documentation [0] for the full list of supported parameters.
            //
            // [0] https://stripe.com/docs/api/payment_intents/create
            try {
              const paymentIntent = await stripe.paymentIntents.create({
                currency: 'EUR',
                amount: 10000,
                automatic_payment_methods: { enabled: true }
              });
          
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
  
        // Expose a endpoint as a webhook handler for asynchronous events.
        // Configure your webhook in the stripe developer dashboard
        // https://dashboard.stripe.com/test/webhooks
        this.app.post('/webhook', async (req, res) => {
            let data, eventType;
  
            // Check if webhook signing is configured.
            if (process.env.STRIPE_WEBHOOK_SECRET) {
                // Retrieve the event by verifying the signature using the raw body and secret.
                let event;
                let signature = req.headers['stripe-signature'];
                try {
                    event = stripe.webhooks.constructEvent(
                        req.rawBody,
                        signature,
                        process.env.STRIPE_WEBHOOK_SECRET
                    );
                } catch (err) {
                    console.log('⚠️  Webhook signature verification failed.');
                    return res.sendStatus(400);
                }
                data = event.data;
                eventType = event.type;
            } else {
                // Webhook signing is recommended, but if the secret is not configured in `config.js`,
                // we can retrieve the event data directly from the request body.
                data = req.body.data;
                eventType = req.body.type;
            }
  
            if (eventType === 'payment_intent.succeeded') {
                // Funds have been captured
                // Fulfill any orders, e-mail receipts, etc
                // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
                console.log('💰 Payment captured!');
            } else if (eventType === 'payment_intent.payment_failed') {
                console.log('❌ Payment failed.');
            }
            res.sendStatus(200);
        });

        this.app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use('/upload', express.static('upload'));
        //this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    }

    /* @description Initialize the App.
   */
    async init(server) {
        await App._initializeStorage();
        this._setRequestLogger();
        this._setCors();
        this._setRequestParser();
        this._initializeApi();
        this._setErrorHandler();
    }

    /* @private
   * @description Set request logger.
   */
    _setRequestLogger() {
        if (DISABLE_REQUEST_LOG !== '1') {
            this.app.use(morgan('dev'));
        }
    }

    
    /* @private
   * @description Set Cross-origin resource sharing.
   *  Reflect any request that is coming from an origin ending with one specified in configs.
   */
    _setCors() {
        this.app.use(
            cors({
                origin: ['*'],
                methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
                allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
                credentials: true,
                optionsSuccessStatus: 200,
                maxAge: -1
            })
        );
    }

    /* @private
   * @description Set body parser:
   *  1. Parses the text as JSON & exposes the resulting object on req.body (limit 1 mb).
   */
    _setRequestParser() {
        this.app.use(bodyParser.json());
        const options = { limit: '500mb', extended: false };
        this.app.use(bodyParser.urlencoded(options));
        this.app.use(express.json());
    }

    /**
   * @private
   * @description Initialize storage.
   */
    static _initializeStorage() {
        return PSQLStorage.init();
    }

    /* @private
   * @description Initialize API.
   */
    _initializeApi() {
        this.app.use('/api/v1', Api);
    }

    /**
   * @private
   * @description General error handler.
   */
    _setErrorHandler() {
        this.app.use(ErrorHandlerMiddleware.init);
    }

    /**
   * @privat
   * @param {Object} server
   * @description Initialize SocketIO
   */

    
}

export default new App();
