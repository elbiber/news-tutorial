const API_KEY = 'b49ceac9a00d47a5a63ccbae71345d2b'

const request = require('request')

request(`https://newsapi.org/v2/top-headlines?country=de&apiKey=${API_KEY}`, (error, response, body) => {
  if (response.statusCode === 200) {
    const bodyObj = JSON.parse(body)
    console.log(`Ergebnisse insgesamt: ${bodyObj.totalResults}`)

    for (let i = 0; i < bodyObj.articles.length; i++) {
      console.log(`${i + 1}. ${bodyObj.articles[i].title}`)
    }
  }
})
