import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { insightsRouter } from './routes/insights';
import { notificationsRouter } from './routes/notifications';
import { aiRouter } from './routes/ai';
import { billingRouter } from './routes/billing';
import { setupWebSocketServer } from './services/socket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// WebSocket setup
const { io, notifyUser } = setupWebSocketServer(server);
app.set('socketIo', io);
app.set('notifyUser', notifyUser);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173'
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing - needs to be before the raw webhook route
app.use((req, res, next) => {
  if (req.originalUrl === '/api/billing/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/insights', insightsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/billing', billingRouter);

// Error handling
app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});