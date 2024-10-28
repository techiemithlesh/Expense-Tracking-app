const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/User");
const sequelize = require("./database/connection");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});

// SYNC DATABASE
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.log("Error creating database and tables", error);
  });

// app.use(cors());

// Parse incoming request body
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

// ROUTES
app.use("/api/auth", userRoutes);

const PORT =
  process.env.ENVIRONMENT === "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

app.listen(PORT, () => {
  console.log(`APP is running on PORT ${PORT}`);
});
