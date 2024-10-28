const express = require("express");
const { createExpense } = require("../controller/ExpenseController");
const router = express.Router();

router.post("/expense-add", createExpense);

module.exports = router;
