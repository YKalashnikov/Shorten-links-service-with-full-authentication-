const express = require('express');
const config = require('config');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json({ extended: true }));

const PORT = config.get('port') ||  5000;

app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/t', require('./routes/redirect'))



app.listen(PORT, console.log(`App has bee running on the port ${PORT}`))