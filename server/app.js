const express = require('express');
const createError = require('http-errors');
var cors = require('cors')
const morgan = require('morgan');
require('dotenv').config();
var connect = require('./config/db')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));
app.use('/api/auth', require('./routes/userRoutes'));

app.use((req, res, next) => {
  next(createError.NotFound());
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
try {
  await connect();
} catch (error) {
  console.log(error.message);
}

  console.log(`🚀 @ http://localhost:${PORT}`)


});
