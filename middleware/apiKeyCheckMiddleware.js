module.exports = (req, res, next) => {
    console.log(req.header('Authorization'))
    if (req.header('Authorization') && req.header('Authorization') === process.env.API_KEY) {
        next()
    } else {
        res.writeHead(401, {
            'WWW-Authenticate': 'Provide API Key'
        })
        res.end('')
    }
}
