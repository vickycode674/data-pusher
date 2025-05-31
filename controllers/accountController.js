const Account = require('../models/accountModel');
const Destination = require('../models/destinationModel');
const { v4: uuidv4 } = require('uuid');


const generateToken = () => {
  return uuidv4();
};

const newId = uuidv4();



exports.createAccount = async (req, res) => {
  try {
    const { email, account_name, website } = req.body;

    if (!email || !account_name) {
      return res.status(400).json({ error: 'Missing required fields: email, name' });
    }

    // Check for duplicate email
    const existing = await Account.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const app_secret_token = generateToken();

    const [id] = await Account.create({ id: newId, email, account_name, website, app_secret_token });

    const newAccount = await Account.findById(id);

    res.status(201).json({
      account_id:newId,
      app_secret_token,
      newAccount
    });
  } catch (err) {
    console.error('Error creating account:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (err) {
    console.error('Error fetching account:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedRows = await Account.update(id, updates);
    if (!updatedRows) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const updatedAccount = await Account.findById(id);
    res.json(updatedAccount);
  } catch (err) {
    console.error('Error updating account:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete destinations linked to account
    await Destination.deleteByAccountId(id);

    const deletedRows = await Account.delete(id);
    if (!deletedRows) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ message: 'Account and associated destinations deleted' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getDestinationsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;

    // Check account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const destinations = await Destination.findByAccountId(accountId);
    res.json(destinations);
  } catch (err) {
    console.error('Error fetching destinations:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
