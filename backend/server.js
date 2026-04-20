require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const askRoutes = require('./routes/askRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
    origin: '*', // Allow all for now to ensure it works
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api', askRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('AI Assistant API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
