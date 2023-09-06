import jwt from 'jsonwebtoken';
import { AuthModel, UsersModel, AdminModels,EmployersModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';
import nodemailer from 'nodemailer';
import config from '../config/variables.config';


const { AUTH } = config;

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET
} = AUTH;

const { InputValidationError, UnauthorizedError } = ErrorsUtil;

export default class AuthService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET);
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET);

        return { accessToken, refreshToken };
    }

    static validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, JWT_ACCESS_SECRET);
        } catch (error) {
            throw new UnauthorizedError(222);
        }
    }

    static validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        } catch (error) {
            throw new UnauthorizedError();
        }
    }

    static async refresh(token) {
        const user = AuthService.validateRefreshToken(token);

        const { accessToken, refreshToken } = AuthService.generateTokens(user);

        const payload = {
            accessToken,
            refreshToken,
            ...user
        };
        return payload;
    }

    static async login(username, password) {
        if(username) {
            const user = await AuthModel.findByUsername(username);
            console.log(user,'user');
            if (!user) {
                const admin = await AdminModels.findByUsername(username);
                if(!admin) throw new InputValidationError('Invalid username or password');
                if (!CryptoUtil.isValidPassword(password, admin.password)) {
                    throw new InputValidationError('Invalid username or password');
                }
                delete admin.password;
                const { accessToken, refreshToken } = AuthService.generateTokens({ ...admin });
    
                const payload = {
                    id: admin.id,
                    username: admin.username,
                    role: admin.role,
                    accessToken,
                    refreshToken
                };
                return payload;
            }
            if (!CryptoUtil.isValidPassword(password, user.password)) {
                throw new InputValidationError('Invalid username or password');
            }
            delete user.password;
            const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

            const payload = {
                id: user.id,
                username: user.username,
                role: user.role,
                accessToken,
                refreshToken

            };
            return payload;
        }else {
            const user = await AuthModel.findByEmail(username);
            if (!user) throw new InputValidationError('Invalid username or password');
            if (!CryptoUtil.isValidPassword(password, user.password)) {
                throw new InputValidationError('Invalid username or password');
            }
            delete user.password;
            const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

            const payload = {
                id: user.id,
                username: user.username,
                role: user.role,
                accessToken,
                refreshToken

            };
            return payload;
        }

    }

    static async loginTasks(email, password) {
        if(email) {
            const user = await EmployersModel.findByUsername(email);
            if (!user) {
                const admin = await EmployersModel.findByUsername(email);
                if(!admin) throw new InputValidationError('Invalid username or password');
                if (!CryptoUtil.isValidPassword(password, admin.password)) {
                    throw new InputValidationError('Invalid username or password');
                }
                delete admin.password;
                const { accessToken, refreshToken } = AuthService.generateTokens({ ...admin });
    
                const payload = {
                    id: admin.id,
                    username: admin.email,
                    role: admin.role,
                    accessToken,
                    refreshToken
                };
                return payload;
            }
            if (!CryptoUtil.isValidPassword(password, user.password)) {
                throw new InputValidationError('Invalid username or password');
            }
            delete user.password;
            const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

            const payload = {
                id: user.id,
                username: user.email,
                role: user.role,
                accessToken,
                refreshToken

            };
            return payload;
        }else {
            const user = await EmployersModel.findByEmail(email);
            if (!user) throw new InputValidationError('Invalid username or password');
            if (!CryptoUtil.isValidPassword(password, user.password)) {
                throw new InputValidationError('Invalid username or password');
            }
            delete user.password;
            const { accessToken, refreshToken } = AuthService.generateTokens({ ...user });

            const payload = {
                id: user.id,
                username: user.email,
                role: user.role,
                accessToken,
                refreshToken

            };
            return payload;
        }

    }

    static async googleLogin(userObject) {
        const user = await AuthModel.findByEmail(userObject.email);
        if (!user) {
            const newUser = {
                displayName: userObject.name,
                email: userObject.email,
                googleId: userObject.sub,
                picture: userObject.picture
            };
            const transport = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    // company mail
                    user: 'khachatryanartur848@gmail.com',
                    pass: 'pveuruzoqugxlrbn',
                },
            });
        
            const mailOptions = {
                // company mail
                from: 'khachatryanartur848@gmail.com',
                to: userObject.email,
                subject: 'Registration email',
                text: 'Congratulations!!! You are registered in our Best Optics company!!!'
            };
        
            transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return error;
                } else {
                    // console.log('Email sent: ' + info.response);
                    return 'Email sent: ' + info.response;
                }
            });
            return await UsersModel.create(newUser);
        }

        const payload = {
            googleId: user.googleId,
            email: user.email,
            displayName: user.displayName,
            picture: user.picture,
            // role: user.role,
            // status: user.status,
        };
        return payload;
    }


    static async fedexAuth(payload) {
        const url = 'https://apis-sandbox.fedex.com/oauth/token';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: payload,
        });

        const data = response.json();
        return data;
    }



}