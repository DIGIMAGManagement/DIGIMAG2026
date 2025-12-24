module.exports = {
  development: {
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:Khizar786.@localhost:5432/digimag",
    dialect: "postgres",
  },
  test: {
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:Khizar786.@localhost:5432/digimag",
    dialect: "postgres",
  },
  production: {
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:Khizar786.@localhost:5432/digimag",
    dialect: "postgres",
  },
};
