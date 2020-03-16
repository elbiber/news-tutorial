require('dotenv').config()
const bcrypt = require('bcrypt')

const userStorage = require('../storage/userStorage')


const ADMIN_HASH = '$2b$10$C1Zj39QlfIVP342YG2AnAurOMgHF2nc5IudXnUGMO1K1joEy8l9xa'
const SALT_ROUNDS = 10

const verifyLogin = (username, password) => {
    if (username !== 'admin') {
        return Promise.resolve(false)
    }
    return bcrypt.compare(password, ADMIN_HASH)
}


const create = async user => {
    const p1 = userStorage.getByUsername(user.username)
    const p2 = bcrypt.hash(user.password, SALT_ROUNDS)
    const [result, passwordHash] = await Promise.all([p1, p2])
    if (result.length > 0) {
        throw new Error(`User "${user.username}" already exists`)
    }

    const insertResult = await userStorage.insert({
        ...user,
        password: passwordHash
    })
    return {
        id: insertResult.insertId
    }
}

const getById = id => userStorage.getById(id)

const getAll = () => userStorage.getAll()

const deleteById = id => userStorage.deleteById(id)
    .then(affectedRows => ({
        affectedRows
    }))

const update = async (id, {
    username, first_name, last_name, password
}) => {
    if (password) {
        password = await bcrypt.hash(password, SALT_ROUNDS)
    }
    if (username) {
        if (await userStorage.usernameExistsElseWhere(id, username)) {
            const err = new Error(`Username "${username}" already taken`)
            err.code = 'DUPLICATE_USERNAME'
            throw err
        }
    }
    userStorage
        .update(id, {
            username,
            first_name,
            last_name,
            password
        })
        .then(affectedRows => ({ affectedRows }))
}


module.exports = {
    verifyLogin,
    create,
    getById,
    getAll,
    deleteById,
    update
}
