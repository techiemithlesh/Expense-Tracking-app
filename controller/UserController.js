const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { Op } = require("sequelize");

const SECRET_KEY = process.env.SECRET_KEY || "YOURNANFDJGJAJFJ";

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone_no, address, user_img } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone_no }],
      },
    });

    if (existingUser) {
      return res.status(400).send("User Allready exist");
    }

    const saltRound = 10;
    const hassedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hassedPassword,
      phone_no,
      address,
      user_img,
    });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({
      token,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: "Error Creating User",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, phone_no, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return { error: "User not found!", status: 404 };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { error: "Invalid Password!", status: 401 };
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    const userData = user.toJSON();
    delete userData.password;

    return res.status(200).json({
      status: true,
      message: "User Login Successfully !",
      user: userData,
      token,
    });
  } catch (error) {
    // console.log("error", error);
    return res.json({
      message: error,
      status: 404,
    });
  }
};
