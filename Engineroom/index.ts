import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/routes';

dotenv.config();

const app = express();

app.use(cors());

// Body parser
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
