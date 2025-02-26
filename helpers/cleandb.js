const knexCleaner = require('knex-cleaner')

console.log('Cleaned')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
})

console.log('Cleaned')
knexCleaner.clean(knex).then(() => {
    console.log('Cleaned')
})
