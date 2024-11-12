const express = require('express');
const {Staff} = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all mentors.
const getAllMentors = async () => {   
    try {
        const users = await Staff.find({ role: 'mentor' });
        return users;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific mentor by their ID.
const getMentorById = async (employeeid) => {
    try {
        const mentor = await Staff.findOne({employeeid : employeeid});
        return mentor;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new mentor.
const addMentor = async (mentorData) => {
    const { name, email, phone, password, employeeid } = mentorData;
    const passhash = await hashPassword(password);
    const newUser = new Staff({
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
const deleteMentorById = async (uuid) => {
    console.log(uuid);
    try {
        const userToDelete = await Staff.findOne({ uuid });
        if (!userToDelete) {
            return { error: 'User not found' };
        }
        const removedUser = await Staff.deleteOne({ uuid });
        return removedUser;
    } catch (err) {
        return {'error': err};
    }
};


module.exports = {
    getAllMentors,
    getMentorById,
    addMentor,
    deleteMentorById,
};
