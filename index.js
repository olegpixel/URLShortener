const express = require('express')
const app = express()
const home = require('./routes/home')
const link = require('./routes/link')
const config = require('./config')
const mongoose = require('mongoose')
// const Joi = require('joi')
// const helmet = require('helmet')
// const morgan = require('morgan')


mongoose.connect('mongodb+srv://m220student:oOoZi4LmdXLPe595@linkshortener-yiu1u.mongodb.net/linkshortener')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json())
app.use('/', home)
app.use('/api/link', link)

app.listen(config.port, () => console.log(`Serv start... Port ${config.port}`))