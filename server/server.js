const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// The simple, reliable middleware order
app.use(cors());
app.use(express.json());

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/session', sessionRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));