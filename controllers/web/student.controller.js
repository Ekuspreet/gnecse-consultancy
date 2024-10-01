const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');

router.get('/profile', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/index', {
        title: 'PROFILE',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/friends', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/friends', {
        title: 'FRIENDS',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/requests', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/requests', {
        title: 'FRIEND REQUESTS',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/jobs-availible', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/jobs-availible', {
        title: 'JOBS AVAILIBLE',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/job-assigned', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/job-assigned', {
        title: 'JOB ASSIGNED',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/job-requests', authMiddleware(['student'], "web"), (req, res) => {
    res.render('student/job-requests', {
        title: 'JOB REQUESTS',
        layout: 'layouts/student',
        user: req.user,
    });
});

router.get('/logout', authMiddleware(['student'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});
module.exports = router;