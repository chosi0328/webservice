const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('webservice', 'root', null, {
    host: 'localhost',
    dialect:'mysql'
  });

class User extends Model {}

User.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});