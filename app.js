import express from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.routes.js';
import { connectDB } from './db/db.js';

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});