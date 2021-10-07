const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const PostModel = require ('../models/postModel.js');


let postModel = new PostModel();


exports.createPost = (req, res, next) => {
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInsert = [userId, title, content];
    postModel.createPost(sqlInsert)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
};

exports.updatePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlInsert1 = [postId];
    let sqlInsert2 = [title, content, postId, userId];
    postModel.updatePost(sqlInsert1, sqlInsert2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        }) 
};

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlInsert1 = [postId];
    let sqlInsert2 = [postId, userId];
    postModel.deletePost(sqlInsert1, sqlInsert2)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

exports.createComment = (req, res, next) => {
    let postId = req.params.id;
    let userId = req.body.userId;
    let content = req.body.content;
    let sqlInsert = [userId, postId, content];
    postModel.createComment(sqlInsert)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response));
        })
};

exports.updateComment = (req, rest, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlInsert1 = [commentId];
    let sqlInsert2 = [content, commentId, userId];
    postModel.updatePost(sqlInsert1, sqlInsert2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })  
};

exports.deleteComment= (req, res, next) => {
    let commentId = req.params.id;
    let sqlInsert = [commentId];
    postModel.deleteComment(sqlInsert)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
};

exports.postLike = (req, res, next) => {
    let userId = req.body.userId;
    let nbLikes = req.body.nbLikes;
    let postId = req.body.postId;
    let sqlInsert1 = [postId, userId];
    let sqlInsert2 = [nbLikes,postId];
    postModel.postLike(sqlInsert1, sqlInsert2, req.body.liked)
        .then((response) =>{
            res.status(201).json(JSON.stringify(response))
        }) 
};

exports.getAllLikes = (req, res, next) => {
    postModel.getAllLikes()
    .then((response) =>{
        res.status(200).json(JSON.stringify(response));
    })
};

exports.getAllPosts = (req, res, next) => {
    postModel.getAllPosts()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
};

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlInsert = [postId];
    postModel.getComments(sqlInsert)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
};
