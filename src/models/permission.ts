import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Permission extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
}

Permission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
    timestamps: true,
  }
);

export default Permission;
