const router = require('express').Router()
const newsController = require('../controllers/newsController')
const settingsController = require('../controllers/settingsController')
const loginController = require('../controllers/loginController')
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddlewar')

router.get('/', newsController.renderHome)
router.get('/home', newsController.renderHome)

router.get('/admin', auth, settingsController.renderSettings)
router.get('/settings', auth, settingsController.renderSettings)
router.post('/settings', auth, settingsController.receiveSettings)

router.get('/login', loginController.renderLogin)
router.post('/login', loginController.submitLogin)
router.get('/logout', loginController.logout)

router.post('/user', userController.create)

module.exports = router
