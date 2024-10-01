const express = require('express');
const user = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all mentors.
const getAllMentors = async () => {   
    try {
        const users = await user.find({ role: 'mentor' });
        return users;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific mentor by their ID.
const getMentorById = async (employeeid) => {
    try {
        const user = await user.findOne({employeeid : employeeid});
        return user;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new mentor.
const addMentor = async (mentorData) => {
    const { name, email, phone, password, employeeid } = mentorData;
    const passhash = await hashPassword(password);
    const newUser = new user({
        name,
        email,
        passhash,
        phone,
        role: 'mentor',
        employeeid,
    });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return {'error': err};
    }
};

// Function to delete a mentor by their ID.
const deleteMentorById = async (employeeid,role) => {
    console.log(employeeid,role);
    
    try {
        const userToDelete = await user.findOne({ role: role, employeeid: employeeid });
        if (!userToDelete) {
            return { error: 'User not found' };
        }
        const removedUser = await user.deleteOne({ role: role, employeeid: employeeid });
        return removedUser;
    } catch (err) {
        return {'error': err};
    }
};

// Verify if mentor exists by crn
const verifyMentorByCRN = async (crn) => {
    try {
        const mentor = await user.findOne({ crn : crn , role : 'mentor' });
        return mentor;
    } catch (err) {
        return {'error': err};
    }
};

module.exports = {
    getAllMentors,
    getMentorById,
    addMentor,
    deleteMentorById,
    verifyMentorByCRN
};
