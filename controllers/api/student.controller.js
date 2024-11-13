const express = require('express');
const router = express.Router();
const {getStudentById} = require('../../models/student.model');
router.get('/:uuid', async (req, res) => {
    
    const student = await getStudentById(req.params.uuid);
    if (student.error) {
        res.status(400).json({ message: 'Invalid UUID' });
        return;
    }
    res.json(student);
});

module.exports = router;