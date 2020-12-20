const express = require('express')
const router = express.Router();

const Whitelist = require('../models/Whitelist')

router.get('/', async (req, res) => {
    const whitelist = await Whitelist.find()
    res.json(whitelist)
})

router.get('/:id', async (req, res) => {
    const whitelistEntry = await Whitelist.findById(req.params.id)
    res.json(whitelistEntry)
})

/*
router.post('/', async (req, res) => {
    const whitelist = new Whitelist(req.body)
    whitelist.updateExpiryDate = req.body.time_added
    await whitelist.save();
    res.json({
        status: 'Whitelist entry saved.'
    })
})
*/

router.post('/', async (req, res) => {
    const whitelist = new Whitelist(req.body)
    whitelist.updateExpiryDate = req.body.time_added

    await Whitelist.init().then(function() {
        Whitelist.create(whitelist).
        then(doc => {
            res.json({ 'status': 'Whitelist entry saved.'})
        }).
        catch(err => {
            res.json({ 'status': 'Whitelist entry was not saved.', err })
        });
    });
})

router.put('/:id', async (req, res) => {
    await Whitelist.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: 'Whitelist entry updated.'
    })
})

router.delete('/:id', async (req, res) => {
    await Whitelist.findByIdAndRemove(req.params.id, req.body)
    res.json({
        status: 'Whitelist entry removed.'
    })
})

module.exports = router;