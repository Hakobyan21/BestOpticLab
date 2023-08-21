// Local Modules
import AuthService from '../auth/auth.service';
import { superAdminModel } from '../models';
import UsersOrders from '../models/usersOrders.model';
import UsersRateItems from '../models/usersRateItems.model';
import { UsersServices } from '../services';
import { SuccessHandlerUtil } from '../utils';
import process from 'process';

import SuperAdminShippo from '../models/superAdminShippo'
const shippo_key = process.env.SHIPPO_API_KEY

const shippo = require('shippo')(
    shippo_key
);  

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// NPM Modules
// import config from '../config/variables.config';
// import process from 'process';

// const HOST_OF_SERVER = process.env.SERVER_HOST;

export default class UsersController {
    static rates;
    static async add(req, res, next) {
        try {
            let { username,  password } = req.body;

            const user = await UsersServices.add({ username,  password,role:'admin' });
            SuccessHandlerUtil.handleAdd(res, next, user);
        } catch (error) {
            console.log('111');
            next(error);
        }
    }

    static async getFailure(req, res, next) {
        try {
            res.send('Failed to authenticate..');
        } catch (error) {
            next(error);
        }
    }

    static async sendMessage(req, res, next) {
        try {
            const payload = req.body;
            const users = await UsersServices.sendMessage(payload);

            SuccessHandlerUtil.handleList(res, next, users);
        } catch (error) {
            next(error);
        }
    }










    static async addressValidation(req, res, next) {
        try {
            const payload = req.body;
            const generatedToken = await AuthService.fedexAuth(
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            );
            const token = 'Bearer ' + generatedToken.access_token;

            const users = await UsersServices.addressValidation(payload, token);

            SuccessHandlerUtil.handleList(res, next, users);
        } catch (error) {
            next(error);
        }
    }


    static async locationSearch(req, res, next) {
        try {
            const payload = req.body;
            const generatedToken = await AuthService.fedexAuth(
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            );
            const token = 'Bearer ' + generatedToken.access_token;

            const users = await UsersServices.locationSearch(payload, token);

            SuccessHandlerUtil.handleList(res, next, users);
        } catch (error) {
            next(error);
        }
    }


    static async postalCodeValidation(req, res, next) {
        try {
            const payload = req.body;
            const generatedToken = await AuthService.fedexAuth(
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            );
            const token = 'Bearer ' + generatedToken.access_token;

            const users = await UsersServices.postalCodeValidation(payload, token);

            SuccessHandlerUtil.handleList(res, next, users);
        } catch (error) {
            next(error);
        }
    }


    static async ratesAndTransitTimes(req, res, next) {
        try {
   
            const payload = req.body;
            const generatedToken = await AuthService.fedexAuth(
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            );
            const token = 'Bearer ' + generatedToken.access_token;

            const users = await UsersServices.ratesAndTransitTimes(payload, token);

            SuccessHandlerUtil.handleList(res, next, users);
        } catch (error) {
            next(error);
        }
    }


    static async ship(req, res, next) {
        try {
            const payload = req.body;
            const generatedToken = await AuthService.fedexAuth(
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            );
            const token = 'Bearer ' + generatedToken.access_token;

            const users = await UsersServices.ship(payload, token);
                if(users.errors) {
                    res.send(500, users)
                }
                console.log(users);
                const insertedData = await UsersOrders.create({orderinfo: [{
                    trackingNumber: users.output.transactionShipments[0].pieceResponses[0].trackingNumber,
                    deliveryDatestamp: users.output.transactionShipments[0].pieceResponses[0].deliveryDatestamp,
                    labelDocument: users.output.transactionShipments[0].pieceResponses[0].packageDocuments[0].url,
                    baseRateAmount: users.output.transactionShipments[0].pieceResponses[0].baseRateAmount
                }]}); 
            insertedData.orderinfo.unshift({orderId: insertedData.id});
            SuccessHandlerUtil.handleList(res, next, insertedData.orderinfo);
        } catch (error) {
            next(error);
        }
    }
    
    
    static async track(req, res, next) {
        try {
            const payload = req.body;
            const generatedToken = await AuthService.fedexAuth(
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            );
            const token = 'Bearer ' + generatedToken.access_token;

            const users = await UsersServices.track(payload, token);

            SuccessHandlerUtil.handleList(res, next, users);
        } catch (error) {
            next(error);
        }
    }












    static async shippo(req, res, next) {
        try {
            console.log(req.body,11111);
            async function add() {
                const addressFrom = req.body;
                const our_address = await superAdminModel.getOurAddress()
                const addressTo = our_address[0]
                const parcel = await superAdminModel.getBoxParams();
                
                console.log(parcel,"parcel")
                console.log(addressFrom,"addressFrom")
                console.log(our_address,"our_address")
                console.log(addressTo,"addressTo")


                shippo.shipment.create(
                    {
                        address_from: addressFrom,
                        address_to: addressTo,
                        parcels: [parcel],
                        async: false,
                    },
                    async function (err, shipment) {
                        if (!err) {
                             console.log(shipment.rates,1111111112);
                            const userRateItems = await UsersRateItems.create({rates: shipment.rates});
                            SuccessHandlerUtil.handleAdd(res, next, [userRateItems]);
                        }
                        else{
                            SuccessHandlerUtil.handleAdd(res, next, err);

                        }
                        console.log(err);
                    }
                );
            }
            add();
        } catch (error) {
            next(error);
        }
    }
    
    static async createShip(req, res, next) {
        try {
            const payload = req.body;
            const rate = payload.rate;



            shippo.transaction.create(
                {
                    rate: rate,
                    async: false,
                    label_file_type: 'PDF_4x6',
                    metadata: '',
                },
                async (err, transaction) => {
                    if (err) {
                        console.log(err);
                    }

                    // TO DO
                    if(transaction === null || transaction.status === "ERROR") {
                        const errorMessage = new Error('Something went wrong.');

                        // Set the status code to indicate an error (e.g., 500 for internal server error)
                        res.status(500);
                      
                        // Send the error message as the response
                        res.send(errorMessage);
                    }else{
                    
                    const userOrder = await SuperAdminShippo.create(payload);
                    // await UsersRateItems.deleteById(payload.userRateId);
                    SuccessHandlerUtil.handleAdd(res, next, [transaction, {userOrderId: userOrder.id}]);
                    }
                }
            );
        } catch (error) {
console.log(2121212121121212);
            next(error);
        }
    }
    

    static async returningShip(req,res,next){
        try {
            const id = req.params.id
            const users = await UsersServices.returningShip(id);

            SuccessHandlerUtil.handleAdd(res, next, users);
            
        } catch (error) {
            next(error)
            
        }
    }
    
    static async rateDetails(req,res,next){
        try {



            const data = req.body;
            const users = await UsersServices.rateDetails(data);

            SuccessHandlerUtil.handleAdd(res, next, users);
            
        } catch (error) {
            next(error)
            
        }
    }


    static async getRateDetails(req,res,next){
        try {



            const id = req.params.id;
            const users = await UsersServices.getRateDetails(id);

            SuccessHandlerUtil.handleGet(res, next, users);
            
        } catch (error) {
            next(error)
            
        }
    }
    static async cancelShippoOrder(req, res, next) {
        const objectId = req.params.object_id;
        console.log(objectId, ">>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<");
        const apiKey = 'shippo_test_5f7acd178f9dfcf8e2562dbe56e3da4c799abb41'; // Replace with your Shippo API key
        try {
            const response = await axios.post(
              `https://api.goshippo.com/shipments/${objectId}/cancel`,
              null,
              {
                headers: {
                  Authorization: ShippoToken `${apiKey}`,
                },
              }
            );
            console.log(response);
        
            console.log('Shipment canceled successfully:', response.data);
          } catch (error) {
            console.error('Error canceling shipment:', error.response);
          }
        }
    


        
        static async getPaymentMethods(req, res, next) {
            const methods = await UsersServices.getPaymentMethods();

            SuccessHandlerUtil.handleGet(res, next, methods);

        }


        
        static async changePaymentMethods(req, res, next) {
            const ids = req.body;
            console.log(ids,"ids");
            const methods = await UsersServices.changePaymentMethods(ids);

            SuccessHandlerUtil.handleAdd(res, next, methods);

        }


        
        static async getShipMethods(req, res, next) {
            const methods = await UsersServices.getShipMethods();

            SuccessHandlerUtil.handleGet(res, next, methods);

        }

}
