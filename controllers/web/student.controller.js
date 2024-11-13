const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const { getRequestsByStudentId } = require('../../models/project.model');
router.get('/profile', authMiddleware(['student'], "web"), async (req, res) => {
    const requests = await getRequestsByStudentId(req.user.uuid);
    console.log(requests);
    res.render('student/index', {
        title: 'PROFILE',
        layout: 'layouts/student',
        user: req.user,
        projects : requests,
    });
});


router.get('/active', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/active', {
        title: 'CURRENT ACTIVE PROJECTS',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/completed', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/completed', {
        title: 'COMPLETED PROJECTS',
        layout: 'layouts/student',
        user: req.user,
    });
});


router.get('/logout', authMiddleware(['student'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});
module.exports = router;