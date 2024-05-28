const Consultation = require('../models/Consultation');

exports.createConsultation = async (req, res) => {
  const { patient, healthcareProvider, consultationType, medicalCondition, notes } = req.body;
  const officer = req.user._id;

  const consultation = new Consultation({
    patient,
    officer,
    healthcareProvider,
    consultationType,
    medicalCondition,
    notes,
  });

  try {
    await consultation.save();
    res.status(201).send(consultation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getConsultations = async (req, res) => {
  const { date, patientName, healthcareProvider, consultationType, medicalCondition } = req.query;
  let filter = {};

  if (date) filter.date = new Date(date);
  if (patientName) filter['patient.name'] = new RegExp(patientName, 'i');
  if (healthcareProvider) filter.healthcareProvider = new RegExp(healthcareProvider, 'i');
  if (consultationType) filter.consultationType = consultationType;
  if (medicalCondition) filter.medicalCondition = new RegExp(medicalCondition, 'i');

  try {
    const consultations = await Consultation.find(filter).populate('patient officer', 'name');
    res.send(consultations);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).populate('patient officer', 'name');
    if (!consultation) return res.status(404).send('Consultation not found');
    res.send(consultation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
