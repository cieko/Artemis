
import express from 'express';
import cors from 'cors';

import {
  planetsRouter,
} from './routes/index.js'


const app = express();

// app.use(cors()) // from all origin
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json()); // Parse any incoming Json from the body of incoming request
app.use(planetsRouter);



export default app;