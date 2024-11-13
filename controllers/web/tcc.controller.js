const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const { getPendingProjects } = require('../../models/project.model');

router.get('/profile', authMiddleware(['tcc'], "web"), async (req, res) => {
    res.render('tcc/index', {
        title: 'PROFILE',
        layout: 'layouts/tcc',
        user: req.user,
        pending : await getPendingProjects(),
    });
});


router.get('/active', authMiddleware(['tcc'], "web"), async (req, res) => {
    res.render('tcc/active', {
        title: 'PROJECTS CURRENTLY BEING WORKED ON',
        layout: 'layouts/tcc',
        user: req.user,
    });
});


router.get('/submission', authMiddleware(['tcc'], "web"), (req, res) => {
    res.render('tcc/submission', {
        title: 'SUBMISSIONS OF WORK DONE',
        layout: 'layouts/tcc',
        user: req.user
    });
});


router.get('/logout', authMiddleware(['tcc'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});

module.exports = router;
