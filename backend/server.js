const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const plantRoutes = require('./routes/plants');
const paymentRoutes = require('./routes/payment');
const imageRoutes = require('./routes/images');

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------- Security Middleware -----------------
app.use(helmet());

// ----------------- Rate Limiting -----------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// ----------------- CORS Configuration -----------------
const allowedOrigins = [
  'http://localhost:3000',
  'https://bloomcart-wheat.vercel.app',
  'https://bloomcart-techbires-projects.vercel.app',
  'https://bloomcart-git-main-techbires-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman / server-to-server calls

    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) // allow ANY *.vercel.app deployment
    ) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true
}));

// ----------------- Body Parsing -----------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ----------------- Database Connection -----------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plantstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ----------------- Routes -----------------
app.use('/api/plants', plantRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/images', imageRoutes);

// ----------------- Health Check -----------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// ----------------- 404 Handler -----------------
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ----------------- Error Handler -----------------
app.use((err, req, res, next) => {
  console.error('🔥 Error Handler:', err.stack);
  res.status(err.status || 500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// ----------------- Start Server -----------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
