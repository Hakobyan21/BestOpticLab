// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
import UsersValidation from '../middlewares/validation/users.validation';
import AuthMiddlaware from '../auth/auth.middlware';
// import AuthMiddlaware from '../auth/auth.middlware';
// import { UsersValidationMiddleware } from '../middlewares/validation';
// import { ImageUploadMiddleware } from '../middlewares/image-upload.middleware';
const router = express.Router();

router.post('/add',
    UsersValidation.validateAddArgs,
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
    // UsersValidation.validateAddArgs,
    UsersController.shippo);

router.post('/createShip',
    // UsersValidation.validateAddArgs,
    UsersController.createShip);

router.get('/returningShip/:id',
    // UsersValidation.validateAddArgs,
    UsersController.returningShip);

    router.post('/rateDetails',
    // UsersValidation.validateAddArgs,
    UsersController.rateDetails);

    router.get('/rateDetails/:id',
    // UsersValidation.validateAddArgs,
    UsersController.getRateDetails);
    router.delete(
        "/cancelShippoOrder/:object_id",
        // UsersValidation.validateAddArgs,
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
