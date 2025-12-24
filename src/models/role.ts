import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class Role extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
}

Role.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Role", tableName: "roles", timestamps: true }
);

export default Role;
