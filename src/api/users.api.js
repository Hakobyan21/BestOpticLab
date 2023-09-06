// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
import AuthMiddlaware from '../auth/auth.middlware';
import { UsersValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.post('/add',
    UsersValidationMiddleware.validateAddArgs,
    UsersController.add);

router.post(
    '/sendMessage',
    UsersController.sendMessage
);



// FEDEX API`s

router.post(
    '/fedex/addressValidation',
    UsersController.addressValidation
);


router.post(
    '/fedex/locationSearch',
    UsersController.locationSearch
);


router.post(
    '/fedex/postalCodeValidation',
    UsersController.postalCodeValidation
);


router.post(
    '/fedex/ratesAndTransitTimes',
    UsersController.ratesAndTransitTimes
);


router.post(
    '/fedex/ship',
    UsersController.ship
);

router.post(
    '/fedex/track',
    UsersController.track
);


// Shipo

router.post('/shippo',
    // UsersValidationMiddleware.validateAddArgs,
    UsersController.shippo);

router.post('/createShip',
    // UsersValidationMiddleware.validateAddArgs,
    UsersController.createShip);

router.get('/returningShip/:id',
    // UsersValidationMiddleware.validateAddArgs,
    UsersController.returningShip);

router.post('/rateDetails',
    // UsersValidationMiddleware.validateAddArgs,
    UsersController.rateDetails);

router.get('/rateDetails/:id',
    // UsersValidationMiddleware.validateAddArgs,
    UsersController.getRateDetails);

router.delete(
    '/cancelShippoOrder/:object_id',
    // UsersValidationMiddleware.validateAddArgs,
    UsersController.cancelShippoOrder
);

router.get('/paymentMethods', 
    UsersController.getPaymentMethods
);

router.put('/paymentMethods', 
    // AuthMiddleware.authenticateFor(["admin"]),
    UsersController.changePaymentMethods    
);

router.get('/shipMethods', 
    // AuthMiddlaware.authenticateFor(["admin"]),
    UsersController.getShipMethods
);


export default router;
