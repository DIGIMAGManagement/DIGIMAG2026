import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  description?: string;
  metadata: object;
  deletedAt?: Date;
}

interface CategoryCreationAttributes
  extends Optional<
    CategoryAttributes,
    "id" | "description" | "metadata" | "deletedAt"
  > {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public description?: string;
  public metadata!: object;
  public deletedAt?: Date;

  public static associate(models: any): void {
    Category.hasMany(models.Article, {
      foreignKey: "category_id",
      as: "articles",
      onDelete: "SET NULL",
    });
  }
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
    paranoid: true,
  }
);

export default Category;
