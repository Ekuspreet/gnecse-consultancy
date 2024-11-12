const express = require('express');
const router = express.Router();
const { addtcc , deletetccById } = require('../../models/tcc.model');
const authMiddleware = require('../../middleware/user.auth');

router.post('/', authMiddleware(['admin'], "api"), async (req, res) => {
    const tcc = await addtcc(req.body);
    if (tcc.error) {
        res.status(400).json({ message: `Please ensure that your information is correct or an account is not already created.`,});
        return;
    }
    res.json({ message: `tcc added successfully! Your UUID : ${tcc.uuid} ` });
});


router.delete('/:id', authMiddleware(['admin'], "api"), async (req, res) => {
    const tcc = await deletetccById(req.params.id,"tcc");
    if (tcc.error) {
        res.status(400).json({ message: `Unable to delete account.`,});
        return;
    }
    res.json({ message: `Testing & Consultancy Account deleted successfully!  UUID : ${req.params.id}` });
});

module.exports = router;