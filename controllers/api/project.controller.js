const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user.auth');
const {addProject, updateProject, approveProject, rejectProject, assignProjectToMentor, getStudentsByProjectId, getRequestedStudentsByProjectId, assignProjectToStudent, joinProjectByStudent, leaveProjectByStudent, startProject, completeProject, rejectSubmission, submitProject } = require('../../models/project.model');
const {getAllStudents} = require('../../models/student.model');

router.post('/', authMiddleware(['alumni'], "api"), async (req, res) => {    
    let status = "";
    if(req.body.action == "post"){
        status = "pending";
    }
    if(req.body.action == "draft"){
        status = "draft";
    }

    delete req.body.action;

    const project = await addProject(req.user.uuid,req.body,status);
    console.log(project)
    if (project.error) {
        return res.status(400).json({ message: `Cannot Create Project`,});
    }
    res.status(200).json({ message: `Project added successfully!` });

});

router.post('/:puid', authMiddleware(['alumni'], "api"), async (req, res) => {
    
    const project = await updateProject(req.params.puid,req.body,"pending");
    if (project.error) {
        return res.status(400).json({ message: `Cannot Create Project`,});
    }
    res.status(200).json({ message: `Project added successfully!` });
    return;
});

router.put('/:puid', authMiddleware(['alumni'], "api"), async (req, res) => {   
    const project = await updateProject(req.params.puid,req.body,"draft");
    if (project.error) {
        return res.status(400).json({ message: `Cannot Update Project`,});
    }
    res.status(200).json({ message: `Project updated successfully!` });
    return;
});

router.post('/approve/:puid', authMiddleware(['tcc'], "api"), async (req, res) => {
    console.log(req.params.puid);
    const project = await approveProject(req.params.puid);
    if (project.error) {
        console.log("This is being called ");
        return res.status(400).json({ message: `Cannot Approve Project`,});
    }
    
    console.log(project);
    res.status(200).json({ message: `Project Approved successfully!` });
    return;
});

router.post('/reject/:puid', authMiddleware(['tcc'], "api"), async (req, res) => {
    const project = await rejectProject(req.params.puid);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Reject Project`,});
    }
    res.status(200).json({ message: `Project rejected successfully!` });
    return;
});

router.post('/assign/:puid' , authMiddleware(['mentor'], "api"), async (req,res) =>{
    const puid = req.params.puid;    
    console.log(req.user.uuid)
    const assigned = await assignProjectToMentor(puid, req.user.uuid);

    if(assigned.error){
        return res.status(400).json({ message: `Cannot Assign Project`,});
    };
    return res.status(200).json({ message: `Project assigned successfully!` });
})

router.get('/invite/:puid', authMiddleware(['mentor'], "api"), async (req, res) => {
    const invited = await getStudentsByProjectId(req.params.puid);
    if(invited.error){
        return res.status(400).json({ message: `Cannot Fetch Students`,});
    }
    console.log(invited);

    const requested = await getRequestedStudentsByProjectId(req.params.puid);
    if(requested.error){
        return res.status(400).json({ message: `Cannot Fetch Students`,});
    }
    console.log(requested);

    const students = await getAllStudents();
    if (students.error) {
        return res.status(400).json({ message: `Cannot Fetch Students`,});
    }

    const filteredStudents = students.filter(student => 
    !invited.some(invitedStudent => invitedStudent === student.uuid) &&
    !requested.some(requestedStudent => requestedStudent === student.uuid)
    );
    // console.log(filteredStudents); 
return res.status(200).json({ message: `Students Fetched`, students: filteredStudents });

});

router.post('/invite/:puid/', authMiddleware(['mentor'], "api"), async (req, res) => {
    const puid = req.params.puid;
    const student = req.body.uuid;
    const mentor = req.user.uuid;
    console.log(puid,student,mentor);
    const assigned = await assignProjectToStudent(puid,mentor,student);
    console.log(assigned);

    if(assigned.error){
        return res.status(400).json({ message: `Cannot Assign Project`,});
    };
    return res.status(200).json({ message: `Project assigned successfully!` });
});

router.post('/student/accept/:puid', authMiddleware(['student'], "api"), async (req, res) => {
    const puid = req.params.puid;
    const student = req.user.uuid;
    const joined = await joinProjectByStudent(puid,student);
    if(joined.error){
        return res.status(400).json({ message: `Cannot Assign Project`,});
    };
    return res.status(200).json({ message: `Project assigned successfully!` });
});

router.post('/student/reject/:puid', authMiddleware(['student'], "api"), async (req, res) => {
    const puid = req.params.puid;
    const student = req.user.uuid;
    const left = await leaveProjectByStudent(puid,student);
    if(left.error){
        return res.status(400).json({ message: `Cannot Assign Project`,});
    };
    return res.status(200).json({ message: `Project assigned successfully!` });
});

router.post('/start/:puid', authMiddleware(['mentor'], "api"), async (req, res) => {
    const puid = req.params.puid;
    const project = await startProject(puid);
    console.log(project);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Start Project`,});
    }
    res.status(200).json({ message: `Project started successfully!` });
    return;
});

router.post('/complete/:puid', authMiddleware(['mentor'], "api"), async (req, res) => {
    const puid = req.params.puid;
    const submission = req.body;
    console.log('called')
    console.log(submission)
    const project = await completeProject(puid, submission);
    console.log(project)
    if (project.error) {
        return res.status(400).json({ message: `Cannot Complete Project`,});
    }
    res.status(200).json({ message: `Project completed successfully!` });
    return;
});

router.post('/submit/:puid', authMiddleware(['tcc'], "api"), async (req, res) => {
    const puid = req.params.puid;
    const project = await submitProject(puid);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Submit Project`,});
    }
    res.status(200).json({ message: `Project submitted successfully!` });
    return;
});

router.post('/rejectsubmission/:puid', authMiddleware(['tcc'], "api"), async (req, res) => {
    const puid = req.body.puid;
    const project = await rejectSubmission(puid);
    if (project.error) {
        return res.status(400).json({ message: `Cannot Reject Submission`,});
    }
    res.status(200).json({ message: `Submission rejected successfully!` });
    return;
});

module.exports = router;