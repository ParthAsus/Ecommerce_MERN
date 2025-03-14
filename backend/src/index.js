import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDb } from './lib/db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/auth/auth.route.js'
import adminProductsRoute from './routes/admin/products-routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'authorization',
    'pragma',
    'cache-control',
  ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductsRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});

