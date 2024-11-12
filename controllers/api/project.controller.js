const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const {addProject} = require('../../models/project.model');

router.post('/', authMiddleware(['alumni'], "web"), async (req, res) => {
    console.log(req.body);    
    console.log(req.body.action);
    let status = "";
    if(req.body.action == "post"){
        status = "pending";
    }else if(req.body.action == "draft"){
        status = "draft";
    }

    delete req.body.action;

    const project = await addProject(req.user.uuid,req.body, status);

    if (project.error) {
        return res.status(400).json({ message: `Cannot Create Project`,});
    }
    res.status(200).json({ message: `Project added successfully!` });

});

router.post('/:puid', authMiddleware(['alumni'], "web"), async (req, res) => {
    console.log(req.body);
    const project = await addProject(req.user.uuid,req.body,req.params.puid);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Create Project`,});
    }
    res.status(200).json({ message: `Project added successfully!` });
    return;
});

router.put('/:puid', authMiddleware(['alumni'], "web"), async (req, res) => {   
    const project = await addProject(req.user.uuid,req.body,req.params.puid);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Update Project`,});
    }
    res.status(200).json({ message: `Project updated successfully!` });
    return;
});
module.exports = router;