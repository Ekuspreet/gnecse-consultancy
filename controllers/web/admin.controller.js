const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const {getAllMentors} = require('../../models/mentor.model');
const {getAllTrainingStaff} = require('../../models/training.model');
const {getAllStudents} = require('../../models/student.model');


router.get('/profile', authMiddleware(['admin'], "web"), (req, res) => {
    res.render('admin/index', {
        title: 'PROFILE',
        layout: 'layouts/admin',
        user: req.user,
    });
});

router.get('/mentors', authMiddleware(['admin'], "web"), async (req, res) => {
    const mentors = await getAllMentors();
    res.render('admin/mentors', {
        title: 'MENTORS',
        layout: 'layouts/admin',
        user: req.user,
        mentors : mentors,
    });
});
router.get('/training', authMiddleware(['admin'], "web"), async (req, res) => {
    const training = await getAllTrainingStaff();
    res.render('admin/training', {
        title: 'TESTING & CONSULTANCY STAFF',
        layout: 'layouts/admin',
        user: req.user,
        trainings : training,
    });
});

router.get('/students', authMiddleware(['admin'], "web"), async (req, res) => {
    const students = await getAllStudents();
    res.render('admin/students', {
        title: 'STUDENTS',
        layout: 'layouts/admin',
        user: req.user,
        students : students,
    });
});



router.get('/logout', authMiddleware(['admin'], "web"), (req, res) => {
    res.clearCookie('auth-token');
    res.redirect('/');
});
module.exports = router;

