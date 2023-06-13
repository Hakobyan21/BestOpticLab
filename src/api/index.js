import express from 'express';

import auth from './auth.api';
import users from './users.api';
import superAdmin from './superUser.api';
import paypal from './paypal.api';
import stripe from './stripe.api';

const app = express();

// API
app.use('/auth', auth);
app.use('/users', users);
app.use('/superAdmin', superAdmin);
app.use('/stripe', stripe);
app.use('/paypal', paypal);


export default app;
