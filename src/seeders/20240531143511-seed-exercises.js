'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('exercises', [
      {
        id: uuidv4(),
        name: 'Push Up',
        description: 'A basic upper body exercise.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Squat',
        description: 'A basic lower body exercise.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Deadlift',
        description: 'A compound exercise targeting multiple muscle groups.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exercises', null, {});
  }
};
