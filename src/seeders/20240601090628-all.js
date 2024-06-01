'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: '1c9a5d3a-7c2b-4bfa-9a50-eca8e1f5c2ab',
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        height: '175.5',
        weight: '70.2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a2cbe123-9c4b-4f12-b6f1-e12c3245b71d',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        height: '160.0',
        weight: '55.3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('exercises', [
      {
        id: '2a4c5d6e-7f8b-4c3d-9a6b-eca8e1f5c3bc',
        name: 'Bench Press',
        description: 'A compound exercise for the chest, shoulders, and triceps.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3b4d5e6f-8a7c-4d5e-9b7c-eca8e1f5c4cd',
        name: 'Squat',
        description: 'A compound exercise for the legs and glutes.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('workouts', [
      {
        id: '4c5d6e7f-9b8c-4d6e-9c8d-eca8e1f5c5de',
        userId: '1c9a5d3a-7c2b-4bfa-9a50-eca8e1f5c2ab',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('workout_details', [
      {
        id: '5d6e7f8g-0a9b-4e6f-9d9e-eca8e1f5c6ef',
        workoutId: '4c5d6e7f-9b8c-4d6e-9c8d-eca8e1f5c5de',
        exerciseId: '2a4c5d6e-7f8b-4c3d-9a6b-eca8e1f5c3bc',
        sets: 3,
        reps: 10,
        weight: '70.0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('exercise_logs', [
      {
        id: '6e7f8g9h-1a0b-4f7g-9e0f-eca8e1f5c7fg',
        userId: '1c9a5d3a-7c2b-4bfa-9a50-eca8e1f5c2ab',
        exerciseId: '2a4c5d6e-7f8b-4c3d-9a6b-eca8e1f5c3bc',
        date: new Date(),
        sets: 3,
        reps: 10,
        weight: '70.0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('body_measurements', [
      {
        id: '7f8g9h0i-2a1b-4g8h-9f1g-eca8e1f5c8gh',
        userId: '1c9a5d3a-7c2b-4bfa-9a50-eca8e1f5c2ab',
        date: new Date(),
        height: '175.5',
        weight: '70.2',
        bodyFat: '15.0',
        muscleMass: '55.0',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('exercises', null, {});
    await queryInterface.bulkDelete('workouts', null, {});
    await queryInterface.bulkDelete('workout_details', null, {});
    await queryInterface.bulkDelete('exercise_logs', null, {});
    await queryInterface.bulkDelete('body_measurements', null, {});
  }
};
