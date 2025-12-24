import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class RefreshToken extends Model {
  public id!: number;
  public token!: string;
  public userId!: number;
  public revoked?: boolean;

  public static associate(models: any): void {
    RefreshToken.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

RefreshToken.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "RefreshToken",
    tableName: "refresh_tokens",
    timestamps: true,
  }
);

export default RefreshToken;
