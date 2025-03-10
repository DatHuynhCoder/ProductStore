import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';

import productRoutes from './routes/product.route.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors())

app.use(express.json()); //allow to accept JSON data in the body

app.use('/api/products', productRoutes); //run route in routes folder

app.listen(PORT,() => {
  connectDB();
  console.log(`Server start at http://localhost:${PORT}`);
})