import sequelize from "../config/database";
import User from "./user";
import Article from "./article";
import Category from "./category";
import Tag from "./tag";
import Author from "./author";
import RefreshToken from "./refreshToken";
import ArticleVersion from "./article_version";
import ActionLog from "./action_log";
import Role from "./role";
import Permission from "./permission";

// Initialize associations
const models = {
  User,
  Article,
  Category,
  Tag,
  Author,
  RefreshToken,
  ArticleVersion,
  ActionLog,
  Role,
  Permission,
};
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default sequelize;
export {
  User,
  Article,
  Category,
  Tag,
  Author,
  RefreshToken,
  ArticleVersion,
  ActionLog,
  Role,
  Permission,
};
