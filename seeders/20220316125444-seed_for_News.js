'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Movies',
      [
        {
          title: 'Pengabdi Setan ',
          content: 'dalah sebuah film horor Indonesia tahun 2017 yang disutradarai dan ditulis oleh Joko Anwar.',
          imgUrl: '',
          authorId: 1,
          rating: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pengabdi Setan 2 Comunion',
          content: 'dalah sebuah film horor Indonesia tahun 2022 yang disutradarai dan ditulis oleh Joko Anwar sebagai sekuel dari film tahun 2017.',
          imgUrl: '',
          authorId: 1,
          rating: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {});
  },
};
