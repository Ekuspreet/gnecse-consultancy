const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const {addProject,getAllProjects,getProjectsById} = require('../../models/project.model');

router.get('/project')

router.post('/project', authMiddleware(['alumni'], "web"), async (req, res) => {
    console.log(req.body);
    const project = await addProject(req.user.uuid,req.body);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Create Project`,});
    }
    res.status(200).json({ message: `Project added successfully!` });
    return;
});

module.exports = router;