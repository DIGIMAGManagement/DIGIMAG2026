"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // Hash passwords
    const saltRounds = 10;
    const adminPass = await bcrypt.hash("AdminPass123!", saltRounds);
    const editorPass = await bcrypt.hash("EditorPass123!", saltRounds);
    const writerPass = await bcrypt.hash("WriterPass123!", saltRounds);

    // Insert users
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@example.com",
          password: adminPass,
          name: "Admin User",
          role: "admin",
          createdAt: now,
          updatedAt: now,
        },
        {
          email: "editor@example.com",
          password: editorPass,
          name: "Editor User",
          role: "editor",
          createdAt: now,
          updatedAt: now,
        },
        {
          email: "writer@example.com",
          password: writerPass,
          name: "Writer User",
          role: "writer",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );

    // Insert sample articles
    await queryInterface.bulkInsert(
      "articles",
      [
        {
          title: "Welcome to Digimag",
          slug: "welcome-to-digimag",
          content: "This is the first article for Digimag.",
          status: "published",
          createdAt: now,
          updatedAt: now,
        },
        {
          title: "How to write great articles",
          slug: "how-to-write-great-articles",
          content: "Tips and tricks for writing engaging content.",
          status: "published",
          createdAt: now,
          updatedAt: now,
        },
        {
          title: "Editorial guidelines",
          slug: "editorial-guidelines",
          content: "Our editorial guidelines and best practices.",
          status: "draft",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "articles",
      {
        slug: [
          "welcome-to-digimag",
          "how-to-write-great-articles",
          "editorial-guidelines",
        ],
      },
      {}
    );
    await queryInterface.bulkDelete(
      "users",
      {
        email: [
          "admin@example.com",
          "editor@example.com",
          "writer@example.com",
        ],
      },
      {}
    );
  },
};
