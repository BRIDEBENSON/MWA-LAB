// db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/inventory', { useNewUrlParser: true, useUnifiedTopology: true });
