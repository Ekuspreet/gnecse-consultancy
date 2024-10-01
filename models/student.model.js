const express = require('express');
const user = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all students.
const getAllStudents = async () => {   
    try {
        const users = await user.find({ role: 'student' });
        return users;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific student by their ID.
const getStudentById = async (uuid) => {
    try {
        const user = await user.findById(uuid);
        return user;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new student.
const createStudent = async (studentData) => {
    const { name, email, password, crn } = studentData;
    const passhash = await hashPassword(password);
    const newUser = new user({
        name,
        email,
        passhash,
        role: 'student',
        crn,
    });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return {'error': err};
    }
};

// Function to delete a student by their ID.
const deleteStudentById = async (uuid) => {
    try {
        const removedUser = await user.remove({ _id: uuid });
        return removedUser;
    } catch (err) {
        return {'error': err};
    }
};

// Verify if student exists by crn
const verifyStudentByCRN = async (crn) => {
    try {
        const student = await user.findOne({ crn : crn , role : 'student' });
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
