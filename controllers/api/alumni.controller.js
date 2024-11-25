const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const assignProjectToMentor = require('../../models/project.model');


router.post('/assign/:puid' , authMiddleware(['mentor'], "api"), async (req,res) =>{
    const puid = req.params.puid;    
    console.log(req.user.uuid)
    const assigned = await assignProjectToMentor(puid, req.user.uuid);

    if(assigned.error){
        return res.status(400).json({ message: `Cannot Assign Project`,});
    };
    return res.status(200).json({ message: `Project assigned successfully!` });
})



module.exports = router;