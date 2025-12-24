// Simple RBAC mapping - can be replaced with DB-backed permissions later
const rolePermissions: Record<string, string[]> = {
  super_admin: ["*"],
  editorial_admin: [
    "articles:create",
    "articles:update",
    "articles:publish",
    "newsletters:send",
  ],
  writer: ["articles:create", "articles:update"],
  support: ["users:help"],
  tech_admin: ["system:manage"],
};

export default rolePermissions;
