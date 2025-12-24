import { Sequelize } from "sequelize";

const dbUrl = "postgres://postgres:Khizar786.@localhost:5432/digimag";

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: false,
  define: { underscored: true },
});

export default sequelize;
