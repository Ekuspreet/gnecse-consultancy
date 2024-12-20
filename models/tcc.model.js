const express = require('express');
const {Staff}= require('./user.model');
const { hashPassword } = require('../services/hasher');

// Function to get a list of all Tcc's.
const getAllTccStaff = async () => {   
    try {
        const users = await Staff.find({ role: 'tcc' });
        return users;
    } catch (err) {
        return {'error': err};
    }
};

// Function to get a specific Tcc by their ID.
const getTccById = async (employeeid) => {
    try {
        const user = await Staff.findOne({employeeid : employeeid , role: 'tcc'});
        return user;
    } catch (err) {
        return {'error': err};
    }
};

// Function to create a new Tcc.
const addTcc = async (TccData) => {
    const { name, email, phone, password, employeeid } = TccData;
    const passhash = await hashPassword(password);
    const newUser = new Staff({
        name,
        email,
        passhash,
        phone,
        role: 'tcc',
        employeeid,
    });
    try {
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return {'error': err};
    }
};

// Function to delete a Tcc by their ID.
const deleteTccById = async (uuid) => {
try{
        const removedUser = await Staff.deleteOne({ role: "tcc", uuid });
        return removedUser;
    } catch (err) {
        return {'error': err};
    }
};


module.exports = {
    getAllTccStaff,
    getTccById,
    addTcc,
    deleteTccById,
};
