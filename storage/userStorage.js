const knex = require('knex')(require('../knexfile'))
const pool = require('./connectionPool')

const insert = user => knex('users')
    .insert(user)
    .returning('id')
    .then(idArray => ({
        insertId: idArray[0]
    }))

const getByUsername = username => knex('users').where('username', username).select('id', 'username', 'first_name', 'last_name')

module.exports = {
    insert,
    getByUsername
}
