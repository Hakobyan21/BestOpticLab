// NPM Modules
import express from 'express';

import {PayPalController} from '../controller';


const router = express.Router();


router.post('/token', 
    PayPalController.generateClientToken);

router.post('/orders', 
    PayPalController.createOrder);

// router.post('/orders/:orderID/capture', 
//     PayPalController.capturePayment);


export default router;
