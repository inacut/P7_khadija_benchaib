const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// CONTROLLERS
const controllersGetAllMessages = require('../controllers/messages/getAllMessages')
const controllersGetAllUserMessages = require('../controllers/messages/getAllUserMessages')
const controllersCreateMessage = require('../controllers/messages/createMessage')
const controllersUpdateMessage = require('../controllers/messages/updateMessage')
const controllersDeleteMessage = require('../controllers/messages/deleteMessage')

// MODELS
const modelsGetAllMessages = require('../models/messages/getAllMessages')
const modelsGetAllUserMessages = require('../models/messages/getAllUserMessages')
const modelsCreateMessage = require('../models/messages/createMessage')
const modelsUpdateMessage = require('../models/messages/updateMessage')
const modelsDeleteMessage = require('../models/messages/deleteMessage')

router.get('/', auth, controllersGetAllMessages, modelsGetAllMessages)
router.get('/:id_user', auth, controllersGetAllUserMessages, modelsGetAllUserMessages)
router.post('/', auth, controllersCreateMessage, modelsCreateMessage)
router.put('/:id_message', auth, controllersUpdateMessage, modelsUpdateMessage)
router.delete('/:id_message', auth, controllersDeleteMessage, modelsDeleteMessage)

module.exports = router