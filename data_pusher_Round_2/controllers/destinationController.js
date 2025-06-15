const Destination = require('../models/destination.model'); // make sure this model exists and is correct
const knex = require('../config/db');
exports.createDestination = async (req, res) => {
  try {
    const { account_id, url, method, headers } = req.body;
    const userId = req.user.id;

    await Destination.create({
      account_id,
      url,
      method,
      headers: JSON.stringify(headers),

      created_by: userId,
      updated_by: userId,
    });

    res.json({ success: true, message: "Destination added" });
  } catch (err) {
    console.error("Error creating destination:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get All Destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const { account_id } = req.query;

    let query = knex('destinations').select('*');

    if (account_id) {
      query = query.where('account_id', account_id);
    }

    const destinations = await query;

    res.status(200).json({ success: true, data: destinations });
  } catch (err) {
    console.error("Error fetching destinations:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// ✅ Get Destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }
    res.status(200).json({ success: true, data: destination });
  } catch (err) {
    console.error("Error fetching destination:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update Destination
exports.updateDestination = async (req, res) => {
  try {
    const updated_by = req.user.id;
    const updateData = {
      ...req.body,
      headers: JSON.stringify(req.body.headers),
      updated_by
    };

    const destination = await Destination.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!destination) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }

    res.status(200).json({ success: true, message: "Destination updated", data: destination });
  } catch (err) {
    console.error("Error updating destination:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete Destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }

    res.status(200).json({ success: true, message: "Destination deleted" });
  } catch (err) {
    console.error("Error deleting destination:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
