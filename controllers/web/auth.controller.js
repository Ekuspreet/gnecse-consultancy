// This controller handles logins and signup page displays. It reads role from url parameter and renders respective page.

const express = require('express');
const router = express.Router();

router.get('/login/:role', (req, res) => {
    const role = req.params.role;
    var title = `${role.toUpperCase()} LOGIN`;
    if(role == 'training') {
        title = 'TNP STAFF LOGIN';
    }
    res.render(`auth/login/${role}`, { role : role , layout : 'layouts/auth', title : title});
});

router.get('/signup/:role', (req, res) => {
    const role = req.params.role;
    var title = `${role.toUpperCase()} SIGN UP`
    if(role == 'training') {
        title = 'TNP STAFF SIGN UP';
    }
    res.render(`auth/signup/${role}`, { role : role , layout : 'layouts/auth', title : title});
});

module.exports = router;