import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./index";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  metadata?: object;
  deletedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "metadata" | "deletedAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public role!: string;
  public metadata?: object;
  public deletedAt?: Date;

  public static associate(models: any): void {
    User.hasMany(models.Article, {
      foreignKey: "author_id",
      as: "articles",
      onDelete: "SET NULL",
    });
    User.hasMany(models.RefreshToken, {
      foreignKey: "user_id",
      as: "refreshTokens",
      onDelete: "CASCADE",
    });
    User.hasMany(models.ActionLog, {
      foreignKey: "actor_id",
      as: "actionLogs",
      onDelete: "SET NULL",
    });
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
    deletedAt: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);

export default User;
