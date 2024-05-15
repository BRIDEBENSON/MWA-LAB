// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./db');
const InventoryItem = require('./models/InventoryItem');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.post('/items', async (req, res) => {
    const { name, quantity } = req.body;
    try {
        const newItem = await InventoryItem.create({ name, quantity });
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await InventoryItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    try {
        const updatedItem = await InventoryItem.findByIdAndUpdate(id, { name, quantity }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await InventoryItem.findByIdAndDelete(id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
