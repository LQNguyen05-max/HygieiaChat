// Utility function to generate a JWT token for a user when logged in
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

modules.exports = { generateToken }