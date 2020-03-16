require('dotenv').config()

if (process.env.DATABASE_URL) {
    // We are running on Heroku
    module.exports = {
        client: 'pg',
        connection: process.env.DB_URL,
        pool: { min: 1, max: 100 }
    }
} else {
    // Local MySQL
    module.exports = {
        client: 'mysql',
        connection: {
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        },
        pool: { min: 1, max: 100 }
    }
}
