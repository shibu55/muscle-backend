'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        username: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        height: 180.5,
        weight: 75.3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        username: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: hashedPassword,
        height: 165.2,
        weight: 60.1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
