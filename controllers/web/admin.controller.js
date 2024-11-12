const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const {getAllMentors} = require('../../models/mentor.model');
const {getAllTccStaff} = require('../../models/tcc.model');
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
    console.log(mentors)
    res.render('admin/mentors', {
        title: 'MENTORS',
        layout: 'layouts/admin',
        user: req.user,
        mentors : mentors,
    });
});
router.get('/tcc', authMiddleware(['admin'], "web"), async (req, res) => {
    const tcc = await getAllTccStaff();
    console.log(tcc)
    res.render('admin/tcc', {
        title: 'TESTING & CONSULTANCY STAFF',
        layout: 'layouts/admin',
        user: req.user,
        tccs : tcc,
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

