import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class ArticleVersion extends Model {
  public id!: number;
  public articleId!: number;
  public version!: number;
  public title!: string;
  public content!: string;
  public metadata?: object;
  public static associate(models: any): void {
    ArticleVersion.belongsTo(models.Article, {
      foreignKey: "article_id",
      as: "article",
    });
  }
}

ArticleVersion.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    articleId: { type: DataTypes.INTEGER, allowNull: false },
    version: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "ArticleVersion",
    tableName: "article_versions",
    timestamps: true,
  }
);

export default ArticleVersion;
