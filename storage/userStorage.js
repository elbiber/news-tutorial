const knex = require('knex')(require('../knexfile'))

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
    .select(...USER_FIELDS)
    .where('username', username)

const getOneByUsername = username => knex('users')
    .first(...USER_FIELDS, 'password')
    .where('username', username)

const getById = id => knex('users')
    .select(...USER_FIELDS)
    .where({ id })
    .first()

const getAll = () => knex('users')
    .select(...USER_FIELDS)

const deleteById = id => knex('users')
    .where({ id })
    .del()

const update = (id, values) => knex('users')
    .update(values)
    .where({ id })

const usernameExistsElseWhere = (id, username) => knex('users')
    .select('id')
    .where({ username })
    .andWhereNot({ id })
    .then(result => result.length > 0)

module.exports = {
    insert,
    getByUsername,
    getOneByUsername,
    getById,
    getAll,
    deleteById,
    update,
    usernameExistsElseWhere
}
