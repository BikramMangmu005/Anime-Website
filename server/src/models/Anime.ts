import { DataTypes, Model } from "sequelize";
import sequelize from "../connections/databaseAuth";

class Anime extends Model {
  public id!: number;
  public title!: string;
  public image!: string;
  public background!: string;
}

Anime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    background: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "animes",
    timestamps: true,
  }
);

export default Anime;