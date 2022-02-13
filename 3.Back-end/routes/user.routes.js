/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: users route
*/

const express = require('express')
let router = express.Router()

const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post([body('firstname').isString(),
        body('lastname').isString(),
        body('name').isString(),
        body('course').isString(),
        body('class').isString(),
        body('bdate').isString(),
        body('email').isString(),
        body('mobile').isNumeric(),
        body('notifications').isBoolean(),
        body('level').isString(),
        body('auth.username').isAlphanumeric(),
        body('auth.password').isString(),
        sanitizeBody('firstname').whitelist(CONFIG.sanitize.alphabeth),
        sanitizeBody('lastname').whitelist(CONFIG.sanitize.alphabeth),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabeth),
        sanitizeBody('course').whitelist(CONFIG.sanitize.alphabeth),
        sanitizeBody('class').whitelist(CONFIG.sanitize.alphabeth + CONFIG.sanitize.numerical)
    ], userController.create)

.get(authController.checkAuth, userController.get)

router.route('/:id')
    .get([param('id').isMongoId()], authController.checkAuth, userController.getone)
    .put([param('id').isMongoId()], userController.put)
    .delete([param('id').isMongoId()], authController.checkAuth, userController.delete)
    .patch([param('id').isMongoId()], authController.checkAuth, userController.update)

module.exports = router