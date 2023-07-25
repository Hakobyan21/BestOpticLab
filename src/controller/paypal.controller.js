
import {PayPalService} from '../services/index';
import { SuccessHandlerUtil } from '../utils';



class PayPalController {
// generate client token
    static async generateClientToken(req, res,next) {
        try {
            const token = await PayPalService.generateClientToken();
            SuccessHandlerUtil.handleAdd(res, next, token);

        } catch (err) {
            next(err);
            res.status(500).send(err.message);
        }
    }

    static async createOrder(req, res, next) {
        try {
            const payload = req.body;
            const order = await PayPalService.createOrder(payload);
            SuccessHandlerUtil.handleAdd(res, next, order);

        } catch (err) {
            next(err);

            console.log(err);
        }
    }

    // static async capturePayment(req, res, next) {
    //   try {
    //     const { orderID } = req.params;
    //     const captureData = await PayPalService.capturePayment(orderID);
    //     SuccessHandlerUtil.handleAdd(res, next, captureData);

    //   } catch (err) {
    //     next(err)

    //     console.log(err);
    //   }
    // }


}

export default PayPalController;

