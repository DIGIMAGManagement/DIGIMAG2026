import { DataTypes, Model } from "sequelize";
import sequelize from "../models/index";

class Subscriber extends Model {
  public id!: number;
  public email!: string;
  public name?: string;
  public subscribed!: boolean;
}

Subscriber.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING },
    subscribed: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    sequelize,
    modelName: "Subscriber",
    tableName: "newsletter_subscribers",
    timestamps: true,
  }
);

export default Subscriber;
