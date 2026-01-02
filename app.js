import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import usersRoutes from './routes/usersRoutes.js';
import ticketsRoutes from './routes/ticketsRoutes.js';
import error from './middlewares/error.js';

const app = express();
const DB_URL = process.env.NODE_ENV === 'test' 
    ? 'mongodb://localhost:27017/ticketing-db-test' 
    : process.env.DB_URL || 'mongodb://localhost:27017/ticketing-db';

mongoose.connect(DB_URL) // Conexión a la base de datos mongo db
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
    
app.use(morgan('dev')); // middleware para logging de peticiones
app.use(express.json()); // middleware para parsear JSON en las peticiones

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Ticketing System!!');
});

app.use('/api/users', usersRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use(error);

export default app;