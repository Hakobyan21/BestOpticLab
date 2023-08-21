// Local Modules
import { UsersModel } from '../models';
import bcrypt from 'bcrypt';

import process from 'process';
import { SuperAdminModel, 
        SuperAdminMessagesModel, 
        UsersRateItemsModel, 
        UsersOrdersModel,
        SuperAdminShippoModel,
        SuperAdminFedexModel,
        PaymentMethodsModel,
        ShipMethodsModel} from '../models';



const ACCOUNT_NUMBER = process.env.ACCOUNT_NUMBER;

export default class UsersServices {

    static async add(payload) {
        const password = await bcrypt.hash(payload.password, 10);
        delete payload.password;
        return await UsersModel.create({ ...payload, password });
    }

    static async sendMessage(payload) {
        // const user = await AuthModel.findByEmail(payload.email);
        // if(!user) {
        // return 'No user with this email!';
        // }
        return await SuperAdminMessagesModel.create(payload);
    }




    static async getPaymentMethods() {
        return await PaymentMethodsModel.getPaymentMethods();
    }


    static async changePaymentMethods(ids) {
        return await PaymentMethodsModel.changePaymentMethods(ids);
    }




    static async getShipMethods() {
        return await ShipMethodsModel.getShipMethods();
    }


    static async ratesAndTransitTimes(payload, token) {
        const fbody = {
            'accountNumber': {
                'value': '740561073'
            },
            'requestedShipment': {
                'shipper': payload,
                'recipient': {
                    'address': {
                        'postalCode': 75063,
                        'countryCode': 'US'
                    }
                },
                'pickupType': 'DROPOFF_AT_FEDEX_LOCATION',
                'rateRequestType': [
                    'ACCOUNT',
                    'LIST'
                ],
                'requestedPackageLineItems': [
                    {
                        'weight': {
                            'units': 'LB',
                            'value': 10
                        }
                    }
                ]
            
            }
        };
        const rates = [];
        const url = 'https://apis-sandbox.fedex.com/rate/v1/rates/quotes';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        };
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(fbody),
        });
        
        const data = await response.json();
        // console.log(data.output.rateReplyDetails,"data");
        // console.log(response +"11111111111111111111111111111111111111")

        const instertedData = await UsersRateItemsModel.create({ rateReplyDetails: data.output.rateReplyDetails });
        const arr = [data?.output?.rateReplyDetails];
        arr.push({ rateId: instertedData.id });

        // for (let el of arr[0]) {
        //     if (el?.serviceType == 'FIRST_OVERNIGHT' || el?.serviceType == 'FEDEX_GROUND') {
        //         rates.push(el)
        //         rates.push(arr[0])
        //     }
        // }
        return arr;

    }


    static returningShip(id) {
        return UsersRateItemsModel.getById(id);
    }

    static async ship(payload, token) {
        const fbody = {
            'labelResponseOptions': 'URL_ONLY',
            'requestedShipment': {
                'shipper': payload,
                'recipients': [
                    {
                        'contact': {
                            'personName': 'RECIPIENT NAME',
                            'phoneNumber': 1234567890,
                            'companyName': 'Recipient Company Name'
                        },
                        'address': {
                            'streetLines': [
                                'RECIPIENT STREET LINE 1',
                                'RECIPIENT STREET LINE 2'
                            ],
                            'city': 'Collierville',
                            'stateOrProvinceCode': 'TN',
                            'postalCode': 38017,
                            'countryCode': 'US'
                        }
                    }
                ],
                'shipDatestamp': '2020-07-03',
                'serviceType': 'PRIORITY_OVERNIGHT',
                'packagingType': 'FEDEX_ENVELOPE',
                'pickupType': 'USE_SCHEDULED_PICKUP',
                'blockInsightVisibility': false,
                'shippingChargesPayment': {
                    'paymentType': 'SENDER'
                },
                'shipmentSpecialServices': {
                    'specialServiceTypes': [
                        'RETURN_SHIPMENT'
                    ],
                    'returnShipmentDetail': {
                        'returnType': 'PRINT_RETURN_LABEL'
                    }
                },
                'labelSpecification': {
                    'imageType': 'PDF',
                    'labelStockType': 'PAPER_85X11_TOP_HALF_LABEL'
                },
                'requestedPackageLineItems': [
                    {
                        'weight': {
                            'value': 1,
                            'units': 'LB'
                        }
                    }
                ]
            },
            'accountNumber': {
                'value': 740561073
            }
        };

        const url = 'https://apis-sandbox.fedex.com/ship/v1/shipments';

        console.log(token);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        };

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(fbody),
        });

        const data = await response.json();
        return data;
        // return await SuperAdminMessagesModel.create(payload);
    }
    static async getFedexShip(id) {
        const data = await SuperAdminFedexModel.getFedexShip(id);
        return data;
    }

    static async rateDetails(data) {
        console.log(data, 111);
        return await SuperAdminModel.rateDetails(data);

    }


    static async getRateDetails(id) {
        return await SuperAdminModel.getRateDetails(id);

    }
}