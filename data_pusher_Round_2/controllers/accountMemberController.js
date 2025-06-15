const knex = require('../config/db');

exports.addMember = async (req, res) => {
  try {
    const { account_id, user_id, role_id, created_by, updated_by } = req.body;

    if (!account_id || !user_id || !role_id) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    await knex('account_members').insert({
      account_id,
      user_id,
      role_id,
      created_by,
      updated_by,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ success: true, message: "Member added to account" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await knex('account_members')
      .join('users', 'users.id', 'account_members.user_id')
      .join('roles', 'roles.id', 'account_members.role_id')
      .select(
        'account_members.id',
        'users.email',
        'roles.role_name',
        'account_members.account_id'
      );

    res.json({ success: true, data: members });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error retrieving members" });
  }
};
