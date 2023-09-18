import { Sequelize, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: './database.sqlite3'
});

class QueryModel extends Model {}
QueryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    query: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

class UserFavoritesModel extends Model {}
QueryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    query: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

export { QueryModel }