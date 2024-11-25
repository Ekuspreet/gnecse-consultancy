const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const { getPendingProjects , getApprovedProjects, getSubmittedProjects } = require('../../models/project.model');

router.get('/profile', authMiddleware(['tcc'], "web"), async (req, res) => {
    res.render('tcc/index', {
        title: 'PROFILE',
        layout: 'layouts/tcc',
        user: req.user,
        pending : await getPendingProjects(),
    });
});


router.get('/assign', authMiddleware(['tcc'], "web"), async (req, res) => {
    res.render('tcc/assign', {
        title: 'PROJECTS CURRENTLY BEING WORKED ON',
        layout: 'layouts/tcc',
        user: req.user,
        projects : await getApprovedProjects(),
    });
});


router.get('/submit', authMiddleware(['tcc'], "web"), (req, res) => {
    res.render('tcc/submit', {
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
