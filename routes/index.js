const router = require('express').Router()
const newsController = require('../controllers/newsController')
const settingsController = require('../controllers/settingsController')

router.get('/', newsController.renderHome)
router.get('/home', newsController.renderHome)
router.get('/admin', settingsController.renderSettings)
router.get('/settings', settingsController.renderSettings)
router.post('/settings', settingsController.receiveSettings)

module.exports = router
