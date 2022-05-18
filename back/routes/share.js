const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// CONTROLLERS
const controllersShareMessage = require('../controllers/share/shareMessage')
const controllersDeleteShare = require('../controllers/share/deleteShare')

// MODELS
const modelsShareMessage = require('../models/share/shareMessage')
const modelsDeleteShare = require('../models/share/deleteShare')

router.post('/:id_message', auth, controllersShareMessage, modelsShareMessage)
router.delete('/:id_share', auth, controllersDeleteShare, modelsDeleteShare)

module.exports = router