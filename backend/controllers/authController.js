const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  let user = new User({ name, email, password, role });

  try {
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid email or password.');
  
  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
  res.send({ token });
};
