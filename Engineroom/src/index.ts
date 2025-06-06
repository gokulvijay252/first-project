import express, { Request, Response } from 'express';

const app = express();
const port = 4000; 

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Engineroom API!' });
});

app.listen(port, () => {
  console.log(`Engineroom server running at http://localhost:${port}`);
});

