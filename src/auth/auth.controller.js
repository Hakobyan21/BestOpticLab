import AuthService from './auth.service';
import { SuccessHandlerUtil } from '../utils';

export default class AuthController {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const loginResult = await AuthService.login(username,  password);

            SuccessHandlerUtil.handleAdd(res, next, loginResult);
        } catch (error) {
            next(error);
        }
    }
    static async loginTasks(req, res, next) {
        try {
            const { email, password } = req.body;
            const loginResult = await AuthService.loginTasks(email,  password);

            SuccessHandlerUtil.handleAdd(res, next, loginResult);
        } catch (error) {
            next(error);
        }
    }

    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;

            const refreshResult = await AuthService.refresh(refreshToken);
            SuccessHandlerUtil.handleAdd(res, next, refreshResult);
        } catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const userObject = req.body;

            const loginResult = await AuthService.googleLogin(userObject);

            SuccessHandlerUtil.handleAdd(res, next, loginResult);
        } catch (error) {
            next(error);
        }
    }



    static async fedexAuth(req, res, next) {
        try {
            const {payload} = req.body;

            const token = await AuthService.fedexAuth(payload);

            SuccessHandlerUtil.handleAdd(res, next, token);
        } catch (error) {
            next(error);
        }
    }


}