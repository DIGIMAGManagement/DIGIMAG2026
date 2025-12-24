import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface ArticleAttributes {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "submitted" | "reviewed" | "published" | "scheduled";
  author_id?: number;
  category_id?: number;
  metadata: object;
  deletedAt?: Date;
}

interface ArticleCreationAttributes
  extends Optional<
    ArticleAttributes,
    | "id"
    | "slug"
    | "status"
    | "author_id"
    | "category_id"
    | "metadata"
    | "deletedAt"
  > {}

class Article
  extends Model<ArticleAttributes, ArticleCreationAttributes>
  implements ArticleAttributes
{
  public id!: number;
  public title!: string;
  public slug!: string;
  public content!: string;
  public status!:
    | "draft"
    | "submitted"
    | "reviewed"
    | "published"
    | "scheduled";
  public author_id?: number;
  public category_id?: number;
  public metadata!: object;
  public deletedAt?: Date;

  public static associate(models: any): void {
    Article.belongsTo(models.User, {
      foreignKey: "author_id",
      as: "author",
    });
    Article.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
    Article.hasMany(models.ArticleVersion, {
      foreignKey: "article_id",
      as: "versions",
      onDelete: "CASCADE",
    });
    Article.belongsToMany(models.Tag, {
      through: "article_tags",
      foreignKey: "article_id",
      otherKey: "tag_id",
      as: "tags",
    });
  }
}

Article.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM(
        "draft",
        "submitted",
        "reviewed",
        "published",
        "scheduled"
      ),
      defaultValue: "draft",
    },
    author_id: { type: DataTypes.INTEGER, allowNull: true },
    category_id: { type: DataTypes.INTEGER, allowNull: true },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Article",
    tableName: "articles",
    timestamps: true,
    paranoid: true,
  }
);

export default Article;
