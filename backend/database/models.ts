import { Sequelize, Model, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: './database.sqlite3'
});

class QueryModel extends Model {};
QueryModel.init(
  {
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
    modelName: 'Query'
  }
);

class UserFavoriteModel extends Model {};
UserFavoriteModel.init(
  {
    userTorreGgId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favoriteUserTorreGgId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'UserFavorite'
  }
);

export { QueryModel, UserFavoriteModel }