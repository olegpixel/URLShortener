const express = require('express')
const Joi = require('joi')
const router = express.Router()
const { Link } = require('../models/link')
const useragent = require('useragent');
const { Stat } = require('../models/stat')

router.get('/', (req, res) => {
    res.send("Home Page");
});

router.get('/:link', (req, res) => {
    const schema = {
        link: Joi.string().min(5).max(6).required()
     }
     const inputLink = req.params.link
     const { error, value } = Joi.validate({ link: inputLink }, schema)
     if (error) return res.status(400).send(error.details[0].message);

     getURL = async () => {
        const find = { "shortHash": inputLink }
        const update = { "$inc": { "clickCounter": 1 } }
        const projection = { "URL": 1, "_id": 0 }
        const resp = await Link.findOneAndUpdate(find, update, projection)
 
        if (!resp) return res.status(404).send("The link doesn't exist.");
        
        saveStat = async () => {
            const agent = useragent.parse(req.headers['user-agent']);
            // res.send(agent)
            let insert = {
                "linkHash": inputLink,
                "OS": {
                    "family": agent.os.family, 
                    "vestion": agent.os.major
                },
                "Browser": {
                    "family": agent.family, 
                    "vestion": agent.major
                }
            } 
            const statWriteResp = await Stat.create(insert)
        }
        
        saveStat()

        res.redirect(resp.URL);

        // res.send(statWriteResp)
     }
     getURL()

});

module.exports = router