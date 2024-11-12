const express = require('express');
const router = express.Router();

router.get('/login/student', (req, res) => {
    const role = 'student';
    const title = 'STUDENT LOGIN';
    res.render('auth/login/student', { role: role, layout: 'layouts/auth', title: title });
});

router.get('/login/alumni', (req, res) => {
    const role = 'alumni';
    const title = 'ALUMNI LOGIN';
    res.render('auth/login/alumni', { role: role, layout: 'layouts/auth', title: title });
});

router.get('/login/mentor', (req, res) => {
    const role = 'mentor';
    const title = 'MENTOR LOGIN';
    res.render('auth/login/mentor', { role: role, layout: 'layouts/auth', title: title });
});

router.get('/login/tcc', (req, res) => {
    const role = 'tcc';
    const title = 'TCC STAFF LOGIN';
    res.render('auth/login/tcc', { role: role, layout: 'layouts/auth', title: title });
});

router.get('/login/admin', (req, res) => {
    const role = 'admin';
    const title = 'ADMIN LOGIN';
    res.render('auth/login/admin', { role: role, layout: 'layouts/auth', title: title });
});

router.get('/signup/student', (req, res) => {
    const role = 'student';
    const title = 'STUDENT SIGNUP';
    res.render('auth/signup/student', { role: role, layout: 'layouts/auth', title: title });
});

router.get('/signup/alumni', (req, res) => {
    const role = 'alumni';
    const title = 'ALUMNI SIGNUP';
    res.render('auth/signup/alumni', { role: role, layout: 'layouts/auth', title: title });
});

module.exports = router;
