const express = require('express')
const app = express()
const home = require('./routes/home')
const link = require('./routes/link')
const config = require('./config')
const mongoose = require('mongoose')
// const Joi = require('joi')
// const helmet = require('helmet')
// const morgan = require('morgan')


mongoose.connect('mongodb+srv://::@linkshortener-yiu1u.mongodb.net/linkshortener')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json())
app.use('/', home)
app.use('/api/link', link)

app.listen(config.port, () => console.log(`Serv start... Port ${config.port}`))











// if (app.get('env') === 'production') {
//     app.use(helmet())
//     app.use(morgan('tiny'))
// }

// let linkArray = [];

// app.get('/', (req, res) => {
//     res.status(200).send(linkArray)
// })


// app.get('/:link', (req, res) => {
//     const schema = {
//         link: Joi.string().min(3).max(5).required()
//     }
//     // res.send(`Hello Word ${req.params.link}`)
//     const validationResult = Joi.validate({ link: req.params.link }, schema)
//     console.log(validationResult.error.details)
//     res.status(404).send(linkArray)
// })

// app.post('/post', (req, res) => {
//     linkArray.push(req.body)
//     res.status(200).send(linkArray)
// })

// app.put('/:link', (req, res) => {
//     const linked = {
//         link: req.params.link,
//         body: req.body
//     }
//     linkArray.push(linked)
//     res.send(linkArray)
// })
