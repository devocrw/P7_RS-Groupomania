const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require ('../models/userModel.js');

let userModel = new UserModel();

exports.signup = (req, res, next) => {
    let email = req.body.email;
	let password = req.body.password;
	let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    bcrypt.hash(password, 10)
        .then (hash => {
            let sqlInserts = [lastName, firstName, email, hash];
            userModel.signup(sqlInserts)
                .then((response) =>{
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) =>{
                    console.error(error);
                    res.status(400).json({error})
                })
        })
        .catch(error => res.status(500).json(error)) 
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlInsert = [email];
    userModel.login(sqlInsert, password)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
};

exports.displayProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInsert = [userId];
    userModel.displayProfile(sqlInsert)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
};

exports.updateProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInsert = [firstName, lastName, email, userId];
    userModel.updateProfile(sqlInsert)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
};

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInsert = [userId];
    userModel.deleteUser(sqlInsert)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
};
