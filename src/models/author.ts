import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface AuthorAttributes {
  id: number;
  name: string;
  bio?: string;
  avatarUrl?: string;
  metadata: object;
  deletedAt?: Date;
}

interface AuthorCreationAttributes
  extends Optional<
    AuthorAttributes,
    "id" | "bio" | "avatarUrl" | "metadata" | "deletedAt"
  > {}

class Author
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
  public id!: number;
  public name!: string;
  public bio?: string;
  public avatarUrl?: string;
  public metadata!: object;
  public deletedAt?: Date;
}

Author.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT },
    avatarUrl: { type: DataTypes.STRING },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Author",
    tableName: "authors",
    timestamps: true,
    paranoid: true,
  }
);

export default Author;
