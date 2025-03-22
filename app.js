import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import transcation from './models/transaction.js';
import category from './models/category.js';

import transactionController from './controllers/transactionController.js';
import categoryController from './controllers/categoryController.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, {})
.then((res) => console.log('successfully connected to DB'))
.catch((err) => console.log('Failed to connect to DB'));


app.use('/api/transactions', transactionController);
app.use('/api/categories', categoryController);

app.listen(3000, () => {console.log('API running on port 3000')});