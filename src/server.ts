import express from 'express'

import { Router, Request, Response } from 'express';

const app = express();

const route = Router();

const PORT = process.env.PORT || 3001;

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: `server is running on port ${PORT}` })
});

app.use(route);

app.listen(PORT)