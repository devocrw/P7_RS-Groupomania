const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const ModerationModel = require ('../models/modModel.js');

let moderationModel = new ModerationModel();


exports.deletePost = (req, res, next) => { // suppression d'un post
    const token = req.headers.authorization.split(' ')[1]; // récupère le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décode le token
    const moderation = decodedToken.moderation; // stocke dans une variable le token décodé de la moderation
    console.log(moderation);
    if(moderation == 1){ // si le profil est trouvé
        let postId = req.params.id; // stocke l'id du post
        let sqlInsert = [postId];
        moderationModel.deletePost(sqlInsert)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};

exports.deleteComment = (req, res, next) => { // suppression d'un commentaire
    const token = req.headers.authorization.split(' ')[1]; // récupère le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décode et vérification du token
    const moderation = decodedToken.moderation; // stocke dans une variable le token décodé de la moderation
    if(moderation == 1){ // si le profil est trouvé
        let commentId = req.params.id; // stocke l'id du post
        let sqlInsert = [commentId];
        moderationModel.deleteComment(sqlInsert)
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};

exports.getAllPosts = (req, res, next) => { // affichage de tous les posts
    const token = req.headers.authorization.split(' ')[1]; // récupère le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décode et vérification du token
    const moderation = decodedToken.moderation; // stocke dans une variable le token décodé de la moderation
    if(moderation == 1){ // si le profil est trouvé
        moderationModel.getAllPosts()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};

exports.getAllComments = (req, res, next) => { // affichage de tous les commentaires
    const token = req.headers.authorization.split(' ')[1]; // récupère le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // décode et vérification du token
    const moderation = decodedToken.moderation; // stocke dans une variable le token décodé de la moderation
    if(moderation == 1){ // si le profil est trouvé
        moderationModel.getAllComments()
            .then((response) =>{
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'La requête est non authorisée'})
    }
};

