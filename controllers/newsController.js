const newsapi = require('newsapi-wrapper')
const settingsService = require('../services/settingsService')

const renderHome = (req, res) => {
    let articles = []
    let message = ''
    const settings = settingsService.readSettings()
    newsapi
        .setApiKey(settings['news-api-key'] || process.env.NEWS_API_KEY || '')
        .setCategory(settings['news-api-category'] || 'business')
        .send()
        .then(response => {
            articles = response.articles
        })
        .catch(err => {
            message = 'Error when retrieving articles from NewsAPI'
        })
        .then(() => {
            res.render('home', {
                title: 'News page',
                heading: 'Welcome to your news dashboard!',
                homeActive: true,
                articles,
                message
            })
        })
}

module.exports = {
    renderHome
}
