const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expense", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate().then(() => {
  try {
    console.log("Connected to mysql database");
  } catch (error) {
    console.log(error, "connecting database");
  }
});

module.exports = sequelize;
