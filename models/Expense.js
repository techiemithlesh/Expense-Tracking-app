const { DataTypes } = require("sequelize");

const sequelize = require("../database/connection");
const User = require("./User");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      field: "user_id",
    },
    name: {
      type: DataTypes.STRING,
    },

    amount: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Enter Amount in Numeric",
        },
      },
    },
  },
  {
    tableName: "tbl_expense",
    timestamps: true,
  }
);

module.exports = Expense;
