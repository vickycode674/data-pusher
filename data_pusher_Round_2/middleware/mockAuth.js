// ✅ MOCK AUTH for testing
module.exports = (req, res, next) => {
  req.user = { id: 1 }; // Mock a valid user ID
  next();
};
