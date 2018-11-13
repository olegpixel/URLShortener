const express = require('express')
const router =  express.Router()
const mongoose = require('mongoose')
const Joi = require('joi')
const { Link, generateHash } = require('../models/link')

router.post('/', async (req, res) => {
    const schema = {
        url: Joi.string().uri({ allowQuerySquareBrackets: true }).required()
    }
    const validationResult = Joi.validate({ url: req.body.url }, schema)
    const shortHash = generateHash(req.body.url)

    validationResult
        .then(async () => {
            const shortHash = generateHash(req.body.url)

            let link = new Link({ URL: req.body.url, shortHash: shortHash });
            const resp = await link.save();
            res.status(200).send(resp)
        }) 
        .catch(error => {
            res.status(400).send({"Error": error.details[0].message})
        })


})

router.get('/:link', async (req, res) => {
    const schema = {
       link: Joi.string().min(5).max(6).required()
    }
    const validationResult = Joi.validate({ link: req.params.link }, schema)
    validationResult
        .then(async () => {
            const resp = await Link.findOne({"shortHash": req.params.link})

            if (!resp) return res.status(404).send("The link doesn't exist.");

            res.send(resp);

        })
        .catch(error => {
            res.status(400).send({"Error": error.details[0].message})
        })

})

module.exports = router