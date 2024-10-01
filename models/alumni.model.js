const express = require('express');
const user = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all alumni.
const getAllAlumni = async () => {   
    try {
        const users = await user.find({ role: 'alumni' });
        return users;
    } catch (err) {
        return err;
    }
};

// Function to get a specific alumni by their ID.
const getAlumniById = async (uuid) => {
    try {
        const user = await user.findById(uuid);
        return user;
    } catch (err) {
        return err;
    }
};

// Function to create a new alumni.
const createAlumni = async (alumniData) => {
    const { name, email, password, passyear, phone } = alumniData;
    const passhash = await hashPassword(password);
    const newUser = new user({
        name,
        email,
        passhash,
        role: 'alumni',
        passyear,
        phone
        });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return {'error': err};
    }
};

const verifyAlumniByEmail = async (email) => {
    try {
        const alumni = await user.findOne({ email : email , role : 'alumni' });
        return alumni;
    } catch (err) {
        return err;
    }
};
// Function to delete an alumni by their ID.
const deleteAlumniById = async (uuid) => {
    try {
        const removedUser = await user.remove({ _id: uuid });
        return removedUser;
    } catch (err) {
        return err;
    }
};

module.exports = {
    getAllAlumni,
    getAlumniById,
    createAlumni,
    deleteAlumniById,
    verifyAlumniByEmail
};
