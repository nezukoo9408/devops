const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Fault Simulation State
let simulateLatency = false;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', express.static('public')); // Allow images to be proxied via /api

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Latency Simulation Middleware
app.use((req, res, next) => {
    if (simulateLatency) {
        const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
        setTimeout(next, delay);
    } else {
        next();
    }
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Health & Metrics
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('/metrics', (req, res) => {
    res.json({
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        activeRequests: 0, // Placeholder
        latencySimulated: simulateLatency,
    });
});

// Fault Simulation Endpoints
app.post('/api/fault/crash', (req, res) => {
    console.log('CRITICAL: Fault simulation - Crashing server...');
    res.status(500).json({ message: 'Crashing server now...' });
    setTimeout(() => process.exit(1), 500);
});

app.post('/api/fault/latency', (req, res) => {
    simulateLatency = !simulateLatency;
    res.json({ message: `Latency simulation ${simulateLatency ? 'ENABLED' : 'DISABLED'}` });
});

// Error Handling
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
