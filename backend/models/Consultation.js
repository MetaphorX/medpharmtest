const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  healthcareProvider: { type: String, required: true },
  consultationType: { type: String, required: true },
  medicalCondition: { type: String, required: true },
  notes: { type: String },
});

module.exports = mongoose.model('Consultation', consultationSchema);
