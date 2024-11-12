const {Student} = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all students.
const getAllStudents = async () => {   
    try {
        const students = await Student.find({ role: 'student' });
        return students;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific student by their ID.
const getStudentById = async (uuid) => {
    try {
        const student = await Student.findById(uuid);
        return student;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new student.
const createStudent = async (studentData) => {
    const { name, email, password, crn } = studentData;
    const passhash = await hashPassword(password);
    const newStudent = new Student({
        name,
        email,
        passhash,
        crn,
    });
    try {
        const savedStudent = await newStudent.save();
        return savedStudent;
    } catch (err) {
        return {'error': err};
    }
};

// Function to delete a student by their ID.
const deleteStudentById = async (uuid) => {
    try {
        const removedStudent = await Student.remove({ _id: uuid });
        return removedStudent;
    } catch (err) {
        return {'error': err};
    }
};

// Verify if student exists by crn
const verifyStudentByCRN = async (crn) => {
    try {
        const student = await Student.findOne({ crn : crn , role : 'student' });
        return student;
    } catch (err) {
        return {'error': err};
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    verifyStudentByCRN
};
