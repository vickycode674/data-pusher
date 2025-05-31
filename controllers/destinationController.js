const Destination = require('../models/destinationModel');
const Account = require('../models/accountModel');
const { v4: uuidv4 } = require('uuid');

exports.createDestination = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { url, http_method, headers } = req.body;


    if (!url || !http_method) {
      return res.status(400).json({ error: 'Missing required fields: url, http_method' });
    }

    // Check if account exists
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Validate headers is an object if provided
    if (headers && typeof headers !== 'object') {
      return res.status(400).json({ error: 'Headers must be an object' });
    }

    const newDestination = {
      id: uuidv4(),
      account_id: accountId,
      url,
      http_method: http_method.toUpperCase(),
      headers: headers || {}
    };

    await Destination.create(newDestination);

    res.status(201).json(newDestination);
  } catch (err) {
    console.error('Error creating destination:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json(destination);
  } catch (err) {
    console.error('Error fetching destination:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate headers if provided
    if (updates.headers && typeof updates.headers !== 'object') {
      return res.status(400).json({ error: 'Headers must be an object' });
    }

    if (updates.http_method) {
      updates.http_method = updates.http_method.toUpperCase();
    }

    const updatedRows = await Destination.update(id, updates);
    if (!updatedRows) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const updatedDestination = await Destination.findById(id);
    res.json(updatedDestination);
  } catch (err) {
    console.error('Error updating destination:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await Destination.delete(id);
    if (!deletedRows) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json({ message: 'Destination deleted' });
  } catch (err) {
    console.error('Error deleting destination:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
