const Account = require("../models/account.model");
const crypto = require("crypto");
const knex = require('../config/db')

exports.createAccount = async (req, res) => {
  try {
    const { account_name, website } = req.body;
    const created_by = req.user?.id || 1; // fallback user ID for test/dev
  
    const app_secret_token = crypto.randomBytes(16).toString("hex");


    const data = {
      account_name,
      website,
      app_secret_token,
      created_by,
      updated_by: created_by
    };

    await Account.create(data);

    res.status(201).json({ success: true, message: "Account created successfully",token:app_secret_token});
  } catch (error) {
    console.log("here is the error coming===============")
    console.error("Error creating account:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// ✅ Get all accounts

exports.getAllAccounts = async (req, res) => {
  try {
    console.log("hello world brooo");
    const { name, created_by } = req.query;

    let query = knex('accounts').select('*');

    if (name) {
      query.where('account_name', 'like', `%${name}%`);
    }

    if (created_by) {
      query.where('created_by', created_by);
    }

    const accounts = await query;
    res.status(200).json({ success: true, data: accounts });

  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ success: false, message: "Unable to fetch accounts" });
  }
};


// ✅ Get account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }
    res.status(200).json({ success: true, data: account });
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    res.status(500).json({ success: false, message: "Error fetching account" });
  }
};

// ✅ Update account
exports.updateAccount = async (req, res) => {
  try {
    const updated_by = req.user.id;
    const updateData = { ...req.body, updated_by };

    const account = await Account.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    res.status(200).json({ success: true, message: "Account updated", data: account });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ success: false, message: "Error updating account" });
  }
};

// ✅ Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);

    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Error deleting account" });
  }
};
