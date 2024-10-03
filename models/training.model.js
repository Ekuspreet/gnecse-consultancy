const express = require('express');
const user = require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all trainings.
const getAllTrainingStaff = async () => {   
    try {
        const users = await user.find({ role: 'training' });
        return users;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific training by their ID.
const getTrainingById = async (employeeid) => {
    try {
        const user = await user.findOne({employeeid : employeeid});
        return user;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new training.
const addTraining = async (trainingData) => {
    const { name, email, phone, password, employeeid } = trainingData;
    const passhash = await hashPassword(password);
    const newUser = new user({
        name,
        email,
        passhash,
        phone,
        role: 'training',
        employeeid,
    });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return {'error': err};
    }
};

// Function to delete a training by their ID.
const deleteTrainingById = async (employeeid,role) => {
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


module.exports = {
    getAllTrainingStaff,
    getTrainingById,
    addTraining,
    deleteTrainingById,
};
