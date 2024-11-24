const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const { getAvailibleProjects, getProjectsByMentorId, getActiveProjectsByMentorId, getSubmittedProjects } = require('../../models/project.model');

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
    const projects = await getActiveProjectsByMentorId(req.user.uuid);
    res.render('mentor/project', {
        title: 'ACTIVE PROJECTS',
        layout: 'layouts/mentor',
        user: req.user,
        projects : projects,
        
    });
});

router.get('/team', authMiddleware(['mentor'], "web"), async (req, res) => {
    const projects = await getProjectsByMentorId(req.user.uuid);
    
    res.render('mentor/team', {
        title: 'FORM A TEAM WITH STUDENTS',
        layout: 'layouts/mentor',
        user: req.user,
        projects : projects,    
    });
});


router.get('/submit', authMiddleware(['mentor'], "web"), async (req, res) => {
    const projects = await getSubmittedProjects();
    res.render('mentor/submit', {
        title: 'SUBMISSIONS OF WORK DONE',
        layout: 'layouts/mentor',
        user: req.user,
        projects : projects,
    });
});


router.get('/logout', authMiddleware(['mentor'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});

module.exports = router;
