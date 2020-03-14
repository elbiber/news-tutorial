const newsapi = require('newsapi-wrapper')
const settingsService = require('./settingsService')

const getNews = () => {
    const settings = settingsService.readSettings()
    return newsapi
        .setApiKey(settings['news-api-key'] || process.env.NEWS_API_KEY || '')
        .setCategory(settings['news-api-category'] || 'business')
        .send()
}

module.exports = {
    getNews
}
