const seedComments = require('./comment-seeds');
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n== Database Sync ==\n');
    await seedUsers();
    console.log('\n== Users Seeded ==\n');
    await seedMessages();
    console.log('\n== Comments Seeded ==\n');
    await seedPosts();
    console.log('\n== Posts Seeded ==\n');

    process.exit(0);
};

seedAll();