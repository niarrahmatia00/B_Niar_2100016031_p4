// src/app.js
const express = require('express');
const app = express();
const port = 3000;

const controller = require('./controller');

app.use(express.json());

// Routes
app.get('/api/items', controller.getItems);
app.post('/api/items', controller.createItem); // Update route
app.put('/api/items/:id', controller.updateItem); // Delete route
app.delete('/api/items/:id', controller.deleteItem);
// src/app.js
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Logika autentikasi sederhana
    if (username === 'user' && password === 'password') {
        return res.status(200).json({ message: 'Login successful' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});


// Start the server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});

module.exports = app;