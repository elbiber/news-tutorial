const router = require('express').Router()
const newsController = require('../controllers/newsController')
const settingsController = require('../controllers/settingsController')
const loginController = require('../controllers/loginController')
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')
const apiKeyCheck = require('../middleware/apiKeyCheckMiddleware')

router.get('/', newsController.renderHome)
router.get('/home', newsController.renderHome)

router.get('/admin', auth, settingsController.renderSettings)
router.get('/settings', auth, settingsController.renderSettings)
router.post('/settings', auth, settingsController.receiveSettings)

router.get('/login', loginController.renderLogin)
router.post('/login', loginController.submitLogin)
router.get('/logout', loginController.logout)

router.post('/user', apiKeyCheck, userController.create)
router.get('/user/:id', apiKeyCheck, userController.getById)
router.get('/user', apiKeyCheck, userController.getAll)
router.delete('/user/:id', apiKeyCheck, userController.deleteById)
router.patch('/user', apiKeyCheck, userController.update)

module.exports = router
