const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const { getAvailibleProjects, getProjectsByMentorId } = require('../../models/project.model');

router.get('/profile', authMiddleware(['mentor'], "web"), async (req, res) => {
    const projects = await getAvailibleProjects();
    console.log(projects);
    res.render('mentor/index', {
        title: 'PROFILE',
        layout: 'layouts/mentor',
        user: req.user,
        projects : projects,
    });
});


router.get('/project', authMiddleware(['mentor'], "web"), async (req, res) => {
    res.render('mentor/project', {
        title: 'START A PROJECT',
        layout: 'layouts/mentor',
        user: req.user,
        
    });
});

router.get('/team', authMiddleware(['mentor'], "web"), async (req, res) => {
    const projects = await getProjectsByMentorId(req.user.uuid);
    
    res.render('mentor/team', {
        title: 'MAKE A TEAM',
        layout: 'layouts/mentor',
        user: req.user,
        projects : projects,    
    });
});


router.get('/submit', authMiddleware(['mentor'], "web"), (req, res) => {
    res.render('mentor/submit', {
        title: 'SUBMISSION OF WORK DONE',
        layout: 'layouts/mentor',
        user: req.user
    });
});


router.get('/logout', authMiddleware(['mentor'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});

module.exports = router;
