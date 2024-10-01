const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passhash = await bcrypt.hash(password, salt);
    return passhash;
};

const verifyPassword = async (password, passhash) => {
    return await bcrypt.compare(password, passhash);
};  
module.exports = {hashPassword, verifyPassword};