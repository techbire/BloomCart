const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const plantRoutes = require('./routes/plants');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Ensure caches respect per-origin responses
app.use((req, res, next) => {
  res.setHeader('Vary', 'Origin');
  next();
});

// CORS configuration
// Allows:
// - Exact match of FRONTEND_URL
// - Local development (http://localhost:3000)
// - Any pattern specified in ALLOWED_ORIGINS (comma-separated), supports wildcard like *.vercel.app
// - By default, also allow any *.vercel.app to simplify Vercel preview deployments
const allowedExactOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
].filter(Boolean);

// Build wildcard and extra patterns
const allowedOriginPatterns = [];
if (process.env.ALLOWED_ORIGINS) {
  process.env.ALLOWED_ORIGINS.split(',').forEach((raw) => {
    const pattern = raw.trim();
    if (pattern) allowedOriginPatterns.push(pattern);
  });
}
// Sensible default: allow any Vercel deployment URL
if (!allowedOriginPatterns.some(p => p === '*.vercel.app')) {
  allowedOriginPatterns.push('*.vercel.app');
}

const allowAll = String(process.env.ALLOW_ALL_ORIGINS || '').toLowerCase() === 'true';

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowAll) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[CORS] AllowAll enabled, origin accepted: ${origin}`);
      }
      return callback(null, true);
    }

    const isExactAllowed = allowedExactOrigins.includes(origin);
    const isPatternAllowed = allowedOriginPatterns.some((pattern) => {
      if (pattern.startsWith('*.')) {
        const suffix = pattern.slice(1); // e.g. '.vercel.app'
        return origin.endsWith(suffix);
      }
      return origin === pattern;
    });

    if (isExactAllowed || isPatternAllowed) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[CORS] Allowed origin: ${origin}`);
      }
      return callback(null, true);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[CORS] Blocked origin: ${origin}`);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 204
}));

// Explicitly handle preflight
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plantstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// Routes
app.use('/api/plants', require('./routes/plants'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/images', require('./routes/images'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
