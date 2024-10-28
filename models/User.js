const { DataTypes } = require("sequelize");

const sequelize = require("../database/connection");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          msg: "Please Enter a valid Email Address",
        },
      },
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: {
          msg: "Mobile number must contain only numbers",
        },
        len: {
          args: [10, 12],
          msg: "Mobile number must be between 10 and 12 digits",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password can not be blank",
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_img: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },

  {
    tableName: "tbl_users",
    timestamps: true,
  }
);

module.exports = User;
