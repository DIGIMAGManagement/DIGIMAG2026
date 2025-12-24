import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface TagAttributes {
  id: number;
  name: string;
  slug: string;
  metadata: object;
  deletedAt?: Date;
}

interface TagCreationAttributes
  extends Optional<TagAttributes, "id" | "metadata" | "deletedAt"> {}

class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public metadata!: object;
  public deletedAt?: Date;

  public static associate(models: any): void {
    Tag.belongsToMany(models.Article, {
      through: "article_tags",
      foreignKey: "tag_id",
      otherKey: "article_id",
      as: "articles",
    });
  }
}

Tag.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: true,
    paranoid: true,
  }
);

export default Tag;
