const loginController = require('../controllers/api/login.controller');
const signUpController = require('../controllers/api/signup.controller');
const mentorController = require('../controllers/api/mentor.controller');
const tccController = require('../controllers/api/tcc.controller');
const alumniController = require('../controllers/api/alumni.controller');
const projectController = require('../controllers/api/project.controller');

module.exports = function(app) {
    app.use('/api/login', loginController);
    app.use('/api/signup', signUpController);
    app.use('/api/mentor', mentorController);
    app.use('/api/tcc', tccController);
    app.use('/api/alumni', alumniController);
    app.use('/api/project', projectController);
}