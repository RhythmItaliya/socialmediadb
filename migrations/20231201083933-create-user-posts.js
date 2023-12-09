'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      postText: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isPhoto: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      caption: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isVisibility: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      postUploadURLs: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('userPosts');
  }
};