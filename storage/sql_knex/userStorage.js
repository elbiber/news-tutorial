const knex = require('knex')(require('../../knexfile'))

const USER_FIELDS = [
    'id',
    'username',
    'first_name',
    'last_name'
]

const insert = user => knex('users')
    .insert(user)
    .returning('id')
    .then(idArray => ({
        insertId: idArray[0]
    }))

const getByUsername = username => knex('users')
    .where('username', username)
    .select(...USER_FIELDS)

const getById = id => knex('users')
    .first()
    .where({ id })
    .select(...USER_FIELDS)

const getAll = () => knex('users')
    .select(...USER_FIELDS)

const deleteById = id => knex('users')
    .where({ id })
    .del()

module.exports = {
    insert,
    getByUsername,
    getById,
    getAll,
    deleteById
}
