const express = require('express');
const router = express.Router();
const { addTraining , deleteTrainingById } = require('../../models/training.model');
const authMiddleware = require('../../middleware/user.auth');

router.post('/', authMiddleware(['admin'], "api"), async (req, res) => {
    const training = await addTraining(req.body);
    if (training.error) {
        res.status(400).json({ message: `Please ensure that your information is correct or an account is not already created.`,});
        return;
    }
    res.json({ message: `training added successfully! Your UUID : ${training.uuid} ` });
});


router.delete('/:id', authMiddleware(['admin'], "api"), async (req, res) => {
    const training = await deleteTrainingById(req.params.id,"training");
    if (training.error) {
        res.status(400).json({ message: `Unable to delete account.`,});
        return;
    }
    res.json({ message: `Testing & Consultancy Account deleted successfully!  UUID : ${req.params.id}` });
});

module.exports = router;