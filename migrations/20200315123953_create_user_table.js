exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('username').notNullable()
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('password').notNullable()
        table.boolean('verified').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updatet_at').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users')
}
