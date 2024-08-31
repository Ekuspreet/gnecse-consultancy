// Controller imports. These controllers are responsible for rendering the views.
const landingPageController = require('../controllers/web/landing.controller');
const authController = require('../controllers/web/auth.controller');
module.exports = function(app) {
    // Landing Page
    app.use('/', landingPageController);

    // Auth Page including Login and Signup.  
    app.use('/auth', authController);

}