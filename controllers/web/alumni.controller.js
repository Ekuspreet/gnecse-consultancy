const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const { getProjectsByAlumniId, getActiveProjectsByAlumniId} = require('../../models/project.model');

router.get('/profile', authMiddleware(['alumni'], "web"), async (req, res) => {
    res.render('alumni/index', {
        title: 'PROFILE',
        layout: 'layouts/alumni',
        user: req.user,
        drafts : await getProjectsByAlumniId(req.user.uuid,"draft"),
    });
});

router.get('/pending', authMiddleware(['alumni'], "web"), async (req, res) => {
    res.render('alumni/pending', {
        title: 'PENDING FOR APPROVAL',
        layout: 'layouts/alumni',
        user: req.user,
        pending : await getProjectsByAlumniId(req.user.uuid,"pending"),
    });
});


router.get('/active', authMiddleware(['alumni'], "web"), async (req, res) => {
    res.render('alumni/active', {
        title: 'ACTIVE JOBS',
        layout: 'layouts/alumni',
        user: req.user,
        projects : await getActiveProjectsByAlumniId(req.user.uuid),
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
