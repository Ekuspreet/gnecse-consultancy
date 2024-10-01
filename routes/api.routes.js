const loginController = require('../controllers/api/login.controller');
const signUpController = require('../controllers/api/signup.controller');

module.exports = function(app) {
    app.use('/api/login', loginController);
    app.use('/api/signup', signUpController);
    
}