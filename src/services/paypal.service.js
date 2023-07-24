import { superAdminModel } from '../models';



//Replace Client ID and App secret
const APP_CLIENT_ID = 'AYpZl-KPXdnlCR0DY7_DOvnBe-bWeoEaX22RnbdcpW9torewWYuSsyhOK24HO5d3mVzLiDH0LejDNsAu';
const APP_CLIENT_SECRET = 'EKU1Dj6L20pVlsKZnyGh628zRKXeHPRmfqah6YKhoXwcEPOC-cLrbEGii92z0DGqSJk8Ypzkqdhkc99z';
const base = 'https://api-m.sandbox.paypal.com';


class PayPalService {

    static async createOrder(payload) {
        const order = [];
        order.push(payload);
        const data = await superAdminModel.createPaypalOrder(order);
        return data;
    
        // console.log(2023);
        // const accessToken = await this.generateAccessToken();
        // console.log(accessToken);
        // const url = `${base}/v2/checkout/orders`;
        // const response = await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        //     "Authorization": `Bearer ${accessToken}`,
        //   },
        //   body: JSON.stringify({
        //     "intent": "CAPTURE",
        //     "purchase_units": [
        //         {
        //             "items": [
        //                 {
        //                     "name": "T-Shirt",
        //                     "description": "Green XLafaf",
        //                     "quantity": "1",
        //                     "unit_amount": {
        //                         "currency_code": "USD",
        //                         "value": "50.00"
        //                     }
        //                 }
        //             ],
        //             "amount": {
        //                 "currency_code": "USD",
        //                 "value": "50.00",
        //                 "breakdown": {
        //                     "item_total": {
        //                         "currency_code": "USD",
        //                         "value": "50.00"
        //                     }
        //                 }
        //             }
        //         }
        //     ],
        //     "application_context": {
        //         "return_url": "https://example.com/return",
        //         "cancel_url": "https://example.com/cancel"
        //     }
        // })
        // });
        // const data = await response.json();
        // // const capture = await paypal.capturePayment(data.id)
        // // console.log(data +"ser");
        // return data;

    }
  
    // static async capturePayment(orderId) {
    //   const accessToken = await this.generateAccessToken();
    //   const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    //   const response = await fetch(url, {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   const data = await response.json();
    //   return data;
    // }
  
    static async generateAccessToken() {
        const auth = Buffer.from(APP_CLIENT_ID + ':' + APP_CLIENT_SECRET).toString('base64');
        // console.log(auth,'auth');
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: 'post',
            body: 'grant_type=client_credentials',
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        // console.log(response,'response');
        const { access_token } = await response.json();
        // console.log(access_token,787);
        return access_token;
    }
  
    static async handleResponse(response) {
        if (response.ok) {
       
            const jsonData = await response.json();
            console.log(jsonData,3322);
            return jsonData;
        } else {
   
            const errorData = await response.json();
            console.log(errorData,3333333333333);
            throw new Error(errorData.message);
        }
    }
  
    static async generateClientToken() {
        const accessToken = await this.generateAccessToken();
        const response = await fetch(`${base}/v1/identity/generate-token`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Accept-Language': 'en_US',
                'Content-Type': 'application/json',
            },
        });
  
        const jsonData = await this.handleResponse(response);
        console.log(jsonData,'JsonFData');
        return jsonData.client_token;
    }
}

export default PayPalService;

