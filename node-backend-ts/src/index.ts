import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database';
import cors from "cors"

const PORT = config.port || 3000;
// create instance server
const app: Application = express();
// middleware to parse incoming requests
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP security middleware
app.use(helmet());
app.use(cors());
app.use('/api', routes);

export const connectionDataBase = db.connect().then((res) => {
  return res
}).catch((err) => {
})
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
  });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh you are lost, read the API documentation to find your way back home 😂',
  });
});

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;
