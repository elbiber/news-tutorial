const bcrypt = require('bcrypt')

const ADMIN_HASH = '$2b$10$C1Zj39QlfIVP342YG2AnAurOMgHF2nc5IudXnUGMO1K1joEy8l9xa'

const verifyLogin = (username, password) => {
    if (username !== 'admin') {
        return Promise.resolve(false)
    }
    return bcrypt.compare(password, ADMIN_HASH)
}

module.exports = {
    verifyLogin
}
