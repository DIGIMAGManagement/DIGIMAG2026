"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // Insert roles
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "admin",
          description: "Administrator",
          created_at: now,
          updated_at: now,
        },
        {
          name: "editor",
          description: "Editor",
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    // Insert permissions
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          name: "manage_users",
          description: "Manage users",
          created_at: now,
          updated_at: now,
        },
        {
          name: "manage_articles",
          description: "Manage articles",
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );

    // Find inserted role and permission ids using raw queries
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles WHERE name IN ('admin','editor')`
    );
    const [perms] = await queryInterface.sequelize.query(
      `SELECT id, name FROM permissions WHERE name IN ('manage_users','manage_articles')`
    );

    const roleMap = roles.reduce((acc, r) => {
      acc[r.name] = r.id;
      return acc;
    }, {});
    const permMap = perms.reduce((acc, p) => {
      acc[p.name] = p.id;
      return acc;
    }, {});

    // Map role_permissions: admin gets all, editor gets manage_articles
    const rolePermissions = [
      {
        role_id: roleMap["admin"],
        permission_id: permMap["manage_users"],
        created_at: now,
      },
      {
        role_id: roleMap["admin"],
        permission_id: permMap["manage_articles"],
        created_at: now,
      },
      {
        role_id: roleMap["editor"],
        permission_id: permMap["manage_articles"],
        created_at: now,
      },
    ];

    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("role_permissions", null, {});
    await queryInterface.bulkDelete(
      "permissions",
      {
        name: ["manage_users", "manage_articles"],
      },
      {}
    );
    await queryInterface.bulkDelete(
      "roles",
      {
        name: ["admin", "editor"],
      },
      {}
    );
  },
};
