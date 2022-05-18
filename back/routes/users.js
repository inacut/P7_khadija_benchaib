const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const isAdminOrHimself = require('../middleware/isAdminOrHimself')

// CONTROLLERS
const controllersGetOneUser = require('../controllers/users/getOneUser')
const controllersLogin = require('../controllers/users/login')
const controllersSignup = require('../controllers/users/signup')
const controllersUpdateUser = require('../controllers/users/updateUser')
const controllersDeleteUser = require('../controllers/users/deleteUser')

// MODELS
const modelsGetOneUser = require('../models/users/getOneUser')
const modelsLogin = require('../models/users/login')
const modelsSignup = require('../models/users/signup')
const modelsUpdateUser = require('../models/users/updateUser')
const modelsDeleteUser = require('../models/users/deleteUser')

router.get('/:id_user', auth, controllersGetOneUser, modelsGetOneUser)
router.post('/login', controllersLogin, modelsLogin)
router.post('/signup', controllersSignup, modelsSignup)
router.put('/:id_user', auth, isAdminOrHimself, multer, controllersUpdateUser, modelsUpdateUser)
router.delete('/:id_user', auth, isAdminOrHimself, controllersDeleteUser, modelsDeleteUser)

module.exports = router