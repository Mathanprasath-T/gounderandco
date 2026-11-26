import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, isDbConnected } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// 1. Database Connection
connectDB();

// 2. Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// 3. Body Parsing & Logging
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// 4. Rate Limiting
app.use('/api', apiLimiter);

// 5. API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    business: 'Gounder & Co.',
    location: 'Perundurai, Tamil Nadu',
    database: isDbConnected() ? 'connected' : 'file_fallback',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/enquiries', enquiryRoutes);

// 6. 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found`,
  });
});

// 7. Centralized Error Handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`[Gounder & Co. Server] Running on http://localhost:${PORT}`);
  console.log(`[Showroom Location] RS Road, Near GH, Perundurai`);
  console.log(`[Database Mode] ${isDbConnected() ? 'MongoDB Connected' : 'Resilient File Storage'}`);
  console.log(`=======================================================`);
});

export default app;


