const jsonwebtoken = require('jsonwebtoken');

const generateToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const verifyToken = (token) => {
    try {
        jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (err) {
        return false;
    }
};

const decodeToken = (token) => {
    return jsonwebtoken.decode(token);
};

module.exports = { generateToken, verifyToken, decodeToken };