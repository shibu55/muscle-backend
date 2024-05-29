import { sequelize } from '../../src/config/sequelize';

module.exports = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Database is ready');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
};
