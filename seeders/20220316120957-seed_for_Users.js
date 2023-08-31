'use strict';
const { hashingPassword } = require('../helpers/bcrypt-helpers');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'dia',
          email: 'admin@mail.com',
          password: hashingPassword('12345'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   username: 'rahayu',
        //   email: 'staff@mail.com',
        //   password: hashingPassword('12345'),
        //   role: 'admin',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
