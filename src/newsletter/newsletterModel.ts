// ...existing code...
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../models/index";

interface NewsletterAttributes {
  id: number;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "sent";
  scheduledAt?: Date;
  sentAt?: Date;
  metadata: object;
}

interface NewsletterCreationAttributes
  extends Optional<
    NewsletterAttributes,
    "id" | "status" | "scheduledAt" | "sentAt" | "metadata"
  > {}

class Newsletter
  extends Model<NewsletterAttributes, NewsletterCreationAttributes>
  implements NewsletterAttributes
{
  public id!: number;
  public subject!: string;
  public content!: string;
  public status!: "draft" | "scheduled" | "sent";
  public scheduledAt?: Date;
  public sentAt?: Date;
  public metadata!: object;
}

Newsletter.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    subject: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("draft", "scheduled", "sent"),
      defaultValue: "draft",
    },
    scheduledAt: { type: DataTypes.DATE },
    sentAt: { type: DataTypes.DATE },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "Newsletter",
    tableName: "newsletters",
    timestamps: true,
  }
);

export default Newsletter;
