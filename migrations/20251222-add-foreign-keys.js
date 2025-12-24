"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add author_id and category_id to articles
    await queryInterface.addColumn("articles", "author_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("articles", "category_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "categories", key: "id" },
      onDelete: "SET NULL",
    });

    // Add FK constraint to refresh_tokens.user_id
    await queryInterface.changeColumn("refresh_tokens", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    });

    // Add FK constraint to article_versions.article_id
    await queryInterface.changeColumn("article_versions", "article_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "articles", key: "id" },
      onDelete: "CASCADE",
    });

    // Add FK constraint to action_logs.actor_id
    await queryInterface.changeColumn("action_logs", "actor_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("articles", "author_id");
    await queryInterface.removeColumn("articles", "category_id");

    await queryInterface.changeColumn("refresh_tokens", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("article_versions", "article_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("action_logs", "actor_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
