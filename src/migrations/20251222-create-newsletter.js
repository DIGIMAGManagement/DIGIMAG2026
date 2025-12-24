"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("newsletters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subject: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      status: {
        type: Sequelize.ENUM("draft", "scheduled", "sent"),
        defaultValue: "draft",
      },
      scheduledAt: { type: Sequelize.DATE },
      sentAt: { type: Sequelize.DATE },
      metadata: { type: Sequelize.JSONB, defaultValue: {} },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("newsletters");
  },
};
