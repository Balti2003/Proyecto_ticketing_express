import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // middleware para logging de peticiones
app.use(express.json()); // middleware para parsear JSON en las peticiones

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Ticketing System!!');
});

export default app;