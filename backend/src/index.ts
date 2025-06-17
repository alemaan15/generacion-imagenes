import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/generate-image', imageRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
