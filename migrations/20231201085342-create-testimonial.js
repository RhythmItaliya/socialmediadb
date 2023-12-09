'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      writerUserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      receiverUserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      testimonialText: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isApproved: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      isReported: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      privacySetting: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('testimonials');
  }
};