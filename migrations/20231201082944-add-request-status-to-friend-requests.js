'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('friendRequests', 'requestStatus', {
      type: Sequelize.ENUM('Pending', 'Rejected'),
      defaultValue: 'Pending',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('friendRequests', 'requestStatus');
  }
};
