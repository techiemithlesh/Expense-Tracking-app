const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  try {
    const { user_id, expense_type, expenseList } = req.body;

    if (!expenseList || !Array.isArray(expenseList)) {
      return res.status(400).json({ message: "Invalid expense list format" });
    }

    const expensesToCreate = expenseList.map((item) => ({
      user_id: user_id || null,
      expense_type,
      name: item.name,
      amount: item.amount,
    }));

    const createExpense = await Expense.bulkCreate(expensesToCreate, {
      validate: true,
    });

    res.status(200).json({
      message: "Expense Added !",
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};
