const { User } = require('../models');

const userData = [
    {
        username: 'Johnnyboy',
        password: 'secretpw'
    },
    {
        username: 'JimBob',
        password: 'superSecret'
    },
    {
        username: 'Miranduh',
        password: 'password'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;