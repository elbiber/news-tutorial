
require('dotenv').config()

const request = require('request')
const yargs = require('yargs')

const args = yargs
  .option('c', {
    describe: 'News category of interest',
    alias: 'category',
    choices: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
    type: 'string',
    default: 'business',
    demandOption: 'false'
  }).option('l', { // location
    describe: 'Country code of interest (e.g., "de", "uk", etc.)',
    alias: 'country',
    type: 'string',
    default: 'de',
    demandOption: 'false'
  }).option('n', {
    describe: 'Number of articles to return',
    alias: 'num',
    type: 'number',
    default: 20,
    demandOption: 'false'
  })
  .help('h')
  .argv

const requestOptions = {
  url: 'https://newsapi.org/v2/top-headlines',
  qs: {
    country: args.country,
    apiKey: process.env.NEWS_API_KEY,
    category: args.category,
    pageSize: args.num
  }
}

request(
  requestOptions,
  (error, response, body) => {
    if (response.statusCode === 200) {
      const bodyObj = JSON.parse(body)
      console.log(`Ergebnisse insgesamt: ${bodyObj.totalResults}`)

      for (let i = 0; i < bodyObj.articles.length; i++) {
        console.log(`${i + 1}. ${bodyObj.articles[i].title}`)
        console.log(`   ${bodyObj.articles[i].url}`)
      }
    }
  }
)
