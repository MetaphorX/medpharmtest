const express = require('express');
const { createConsultation, getConsultations, getConsultation } = require('../controllers/consultationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createConsultation);
router.get('/', authMiddleware, getConsultations);
router.get('/:id', authMiddleware, getConsultation);

module.exports = router;
