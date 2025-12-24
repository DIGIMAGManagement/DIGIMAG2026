import { DataTypes, Model } from "sequelize";
import sequelize from "./index";

class NewsletterEvent extends Model {
  public id!: number;
  public newsletterId!: number;
  public subscriberId!: number;
  public type!: "open" | "click";
  public meta?: object;
}

NewsletterEvent.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    newsletterId: { type: DataTypes.INTEGER, allowNull: false },
    subscriberId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM("open", "click"), allowNull: false },
    meta: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "NewsletterEvent",
    tableName: "newsletter_events",
    timestamps: true,
  }
);

export default NewsletterEvent;
