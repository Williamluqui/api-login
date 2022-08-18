
const knex = require('knex')({
    client: 'mysql2',
    connection:{
        host:'localhost',
        user: process.env.USER,
        password: process.env.PASSWORD,
        database:  process.env.DATABASE
    }

});

module.exports = knex;
