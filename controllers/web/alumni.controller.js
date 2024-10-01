const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
router.get('/profile', authMiddleware(['alumni'], "web"), (req, res) => {
    res.render('alumni/index', {
        title: 'PROFILE',
        layout: 'layouts/alumni',
        user: req.user
    });
});

router.get('/active', authMiddleware(['alumni'], "web"), (req, res) => {
    res.render('alumni/active', {
        title: 'ACTIVE JOBS',
        layout: 'layouts/alumni',
        user: req.user
    });
});

router.get('/completed', authMiddleware(['alumni'], "web"), (req, res) => {
    res.render('alumni/completed', {
        title: 'COMPLETED JOBS',
        layout: 'layouts/alumni',
        user: req.user
    });
});

router.get('/logout', authMiddleware(['alumni'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});

module.exports = router;
