import { sequelize } from '../../src/config/sequelize';
import sinon from 'sinon';

module.exports = async () => {
  console.log('Starting globalTeardown');
  sinon.restore();
  console.log('Sinon restored');
  await sequelize.close();
  console.log('Database connection closed');
};
