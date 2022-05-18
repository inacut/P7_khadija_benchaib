const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

// CONTROLLERS
const controllersGetAllComments = require('../controllers/comments/getAllComments')
const controllersCreateComment = require('../controllers/comments/createComment')
const controllersUpdateComment = require('../controllers/comments/updateComment')
const controllersDeleteComment = require('../controllers/comments/deleteComment')

// MODELS
const modelsGetAllComments = require('../models/comments/getAllComments')
const modelsCreateComment = require('../models/comments/createComment')
const modelsUpdateComment = require('../models/comments/updateComment')
const modelsDeleteComment = require('../models/comments/deleteComment')

router.get('/:id_message', auth, controllersGetAllComments, modelsGetAllComments)
router.post('/:id_message', auth, controllersCreateComment, modelsCreateComment)
router.put('/:id_comment', auth, controllersUpdateComment, modelsUpdateComment)
router.delete('/:id_comment', auth, controllersDeleteComment, modelsDeleteComment)

module.exports = router