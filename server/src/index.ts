import express from 'express';
import cors from 'cors';
import { createShortUrlController, redirectToOriginalUrl } from './controllers/url.controller';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL'si
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// API rotaları
app.post('/api/shorten', createShortUrlController);
app.get('/:shortCode', redirectToOriginalUrl);

// Kök dizin için basit bir yanıt
app.get('/', (req, res) => {
  res.json({ message: 'LinkCini API is running!' });
});

// 404 hatası
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Hata yönetimi
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
