import adminRoute from './routes/admin.js';
import professionServicesRoute from './routes/professionServices.js';
import stylistRoute from './routes/stylist.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use('/admin', adminRoute);
app.use('/profession-services', professionServicesRoute);
app.use('/stylist', stylistRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}, your access key is ${process.env.BUCKET_NAME}`);
});
