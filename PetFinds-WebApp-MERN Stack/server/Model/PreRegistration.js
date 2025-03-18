const mongoose = require('mongoose');

const preRegistrationSchema = new mongoose.Schema({
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  email: { type: String, required: true },
  notified: { type: Boolean, default: false },
});

module.exports = mongoose.model('PreRegistration', preRegistrationSchema);