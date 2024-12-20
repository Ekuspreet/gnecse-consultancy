// Controller imports. These controllers are responsible for rendering the views.
const landingPageController = require('../controllers/web/landing.controller');
const authController = require('../controllers/web/auth.controller');
const studentController = require('../controllers/web/student.controller');
const alumniController = require('../controllers/web/alumni.controller');
const adminController = require('../controllers/web/admin.controller');
const tccController = require('../controllers/web/tcc.controller');
const mentorController = require('../controllers/web/mentor.controller');

module.exports = function(app) {
    // Landing Page
    app.use('/', landingPageController);

    // Auth Page including Login and Signup.  
    app.use('/auth', authController);

    // Pages for the student
    app.use('/student', studentController);

    // Pages for the alumni
    app.use('/alumni', alumniController);

    // Pages for the admin
    app.use('/admin', adminController);

    // Pages for the tcc
    app.use('/tcc', tccController);

    // Pages for the mentor
    app.use('/mentor', mentorController);
}