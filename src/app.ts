import express from 'express';
import pingRoutes from './routes/ping';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', pingRoutes);

export default app;
