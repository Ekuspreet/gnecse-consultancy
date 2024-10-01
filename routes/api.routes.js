const loginController = require('../controllers/api/login.controller');
const signUpController = require('../controllers/api/signup.controller');
const mentorController = require('../controllers/api/mentor.controller');
const trainingController = require('../controllers/api/training.controller');
module.exports = function(app) {
    app.use('/api/login', loginController);
    app.use('/api/signup', signUpController);
    app.use('/api/mentor', mentorController);
    app.use('/api/training', trainingController);
    
}