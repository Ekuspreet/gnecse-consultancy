const express = require("express");
const router = express.Router();
const { createStudent } = require("../../models/student.model");
const { createAlumni } = require("../../models/alumni.model");

router.post("/alumni", async (req, res) => {
  if (req.body.password !== req.body.cnfpassword) {
    res.status(400).json({ message: "Passwords do not match" });
    return;
  }
  console.log(req.body);
  const alumni = await createAlumni(req.body);
  if (alumni.error) {
    res.status(400).json({ message: `Please ensure that your information is correct or an account is not already created.`,});
    return;
  }
  res.json({ message: `Login successful! Your UUID : ${alumni.uuid} ` });

});

router.post("/student", async (req, res) => {
  if (req.body.password !== req.body.cnfpassword) {
    res.status(400).json({ message: "Passwords do not match" });
    return;
  }

  const student = await createStudent(req.body);
  console.log(student);
  
  if (student.error) {
    res.status(400).json({ message: `Please ensure that your information is correct or an account is not already created.`,});
    return;
  }

  res.json({ message: `Login successful! Your UUID : ${student.uuid} ` });
});
module.exports = router;
