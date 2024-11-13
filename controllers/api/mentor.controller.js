const express = require('express');
const router = express.Router();

const { addMentor, deleteMentorById } = require('../../models/mentor.model');
const authMiddleware = require('../../middleware/user.auth');

router.post('/', authMiddleware(['admin'], "api"), async (req, res) => {
    console.log(req.body);
    const mentor = await addMentor(req.body);
    console.log(mentor);
    if (mentor.error) {
        res.status(400).json({ message: `Please ensure that your information is correct or an account is not already created.`,});
        return;
    }
    res.json({ message: `Mentor added successfully! Your UUID : ${mentor.uuid} ` });
});

router.delete('/:id', authMiddleware(['admin'], "api"), async (req, res) => {
    console.log(req.params.id);
    const mentor = await deleteMentorById(req.params.id);
    console.log(mentor);
    if (mentor.error) {
        res.status(400).json({ message: `Unable to delete account.`,});
        return;
    }
    res.json({ message: `Mentor deleted successfully! UUID : ${req.params.id} ` });
});
module.exports = router;