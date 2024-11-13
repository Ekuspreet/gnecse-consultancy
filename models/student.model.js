const {Student} = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all students.
const getAllStudents = async () => {   
    try {
        const students = await Student.find({});
        return students;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific student by their ID.
const getStudentById = async (uuid) => {
    try {
        const student = await Student.find({uuid});
        return student;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new student.
const createStudent = async (studentData) => {
    const { name, email, password  } = studentData;
    const passhash = await hashPassword(password);
    const newStudent = new Student({
        name,
        email,
        passhash,

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



const verifyStudentByEmail = async (email) => {
    try {
        const student = await Student.findOne({ email });
        return student;
    }
    catch (error) {
        return { error : error};
    }
};

const getIncomingRequests = async (uuid) => {
    try {
        const student = await Student.findById(uuid);
        return student.incomingRequests;
    } catch (error) {
        return { error };
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudentById,
    verifyStudentByEmail
};
