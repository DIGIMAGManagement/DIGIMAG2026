import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class ActionLog extends Model {
  public id!: number;
  public actorId!: number | null;
  public action!: string;
  public meta?: object;
  public static associate(models: any): void {
    ActionLog.belongsTo(models.User, {
      foreignKey: "actor_id",
      as: "actor",
    });
  }
}

ActionLog.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    actorId: { type: DataTypes.INTEGER, allowNull: true },
    action: { type: DataTypes.STRING, allowNull: false },
    meta: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "ActionLog",
    tableName: "action_logs",
    timestamps: true,
  }
);

// Define associations

export default ActionLog;
