const express = require('express');
const cors = require('cors');

// --- SETUP OUR EXPRESS APP ---
const app = express();
const port = 5000;

// --- MIDDLEWARE ---
app.use(cors()); // Allow requests from our React app
app.use(express.json()); // Allow the server to read JSON from request bodies

// --- IMPORT & USE OUR ROUTES ---
const sessionRoutes = require('./routes/sessionRoutes'); // Import our new router
app.use('/api/session', sessionRoutes); // Tell Express to use these routes for any path that starts with /api/session

// --- START THE SERVER ---
app.listen(port, () => console.log(`🚀 Server listening on http://localhost:${port}`));