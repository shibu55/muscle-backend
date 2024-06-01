import express from 'express';
import userRoutes from './routes/user';
import pingRoutes from './routes/ping';
import exerciseRoutes from './routes/exercise';
import workoutRoutes from './routes/workout';
import workoutDetailRoutes from './routes/workoutDetail';
import exerciseLogRoutes from './routes/exerciseLog';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', pingRoutes);
app.use('/api', exerciseRoutes);
app.use('/api', workoutRoutes);
app.use('/api', workoutDetailRoutes);
app.use('/api', exerciseLogRoutes);

export default app;
