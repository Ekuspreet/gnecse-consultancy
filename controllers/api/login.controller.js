const express = require('express');
const router = express.Router();
const { generateToken } = require('../../services/token');
const { verifyPassword } = require('../../services/hasher');
const { verifyStudentByCRN } = require('../../models/student.model');
const { verifyAlumniByEmail } = require('../../models/alumni.model');
const { getTrainingById } = require('../../models/training.model');
const { getMentorById } = require('../../models/mentor.model');


router.post('/admin', (req, res) => {
    const { username, password } = req.body;
    if(username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
        const token = generateToken({ uuid: "0001", role: "admin", name: "Dr. Kiran Jyoti" });
        res.cookie('auth-token', token, { httpOnly: true, secure: true });
        res.json({ message: `Login successful for UUID: 0001` });
        return;
    }
    res.status(400).json({ message: 'Invalid credentials' });
});
router.post('/student', async (req, res) => {
    const { crn, password } = req.body;
    console.log(req.body);
    
    const student = await verifyStudentByCRN(crn);
    console.log(student);
    if (student.error) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const passwordMatch = verifyPassword(password, student.passhash);
    if (!passwordMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }
    const token = generateToken({ uuid: student.uuid, role: student.role, name: student.name });

    res.cookie('auth-token', token, { httpOnly: true, secure: true });
    res.json({ message: `Login successful for UUID: ${student.uuid}` });
});

router.post('/alumni', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    const alumni = await verifyAlumniByEmail(email); // Assuming alumni are verified similarly
    console.log(alumni);
    if (alumni.error) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const passwordMatch = verifyPassword(password, alumni.passhash);
    if (!passwordMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }
    const token = generateToken({ uuid: alumni.uuid, role: alumni.role, name: alumni.name });

    res.cookie('auth-token', token, { httpOnly: true, secure: true });
    res.json({ message: `Login successful for UUID: ${alumni.uuid}` });
});

router.post('/training', async (req, res) => {
    const { employeeid, password } = req.body;
    console.log(req.body);
    
    const training = await getTrainingById(employeeid);
    console.log(training);
    if (training.error) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const passwordMatch = verifyPassword(password, training.passhash);
    if (!passwordMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }
    const token = generateToken({ uuid: training.uuid, role: training.role, name: training.name });

    res.cookie('auth-token', token, { httpOnly: true, secure: true });
    res.json({ message: `Login successful for UUID: ${training.uuid}` });
});

router.post('/mentor', async (req, res) => {
    const { employeeid, password } = req.body;
    console.log(req.body);
    
    const mentor = await getMentorById(employeeid);
    console.log(mentor);
    if (mentor.error) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }

    const passwordMatch = verifyPassword(password, mentor.passhash);
    if (!passwordMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
    }
    const token = generateToken({ uuid: mentor.uuid, role: mentor.role, name: mentor.name });

    res.cookie('auth-token', token, { httpOnly: true, secure: true });
    res.json({ message: `Login successful for UUID: ${mentor.uuid}` });
});
module.exports = router;