// Modèle du gestionnaire des data qui transite sur le RS //

const connectdb = require('../connectdb.js');
const mysql = require('mysql');


class ModerationModel {
    constructor() {
    }

    getAllPosts() { // peut afficher tous les posts
        let sql = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%e/%m/%y à %k:%i:%s') AS date, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY date DESC";
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };

    deletePost(sqlInsert) { // peut supprimer n'importe quel post
        let sql = 'DELETE FROM posts WHERE id = ?';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: 'Le post a bien été supprimé.' });
            })
        })
    };

    getAllComments() { // peut afficher tous les commentaires
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%e/%m/%y à %k:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id ORDER BY date DESC";
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            })
        })
    };

    deleteComment(sqlInsert) { // peut supprimer tous les commentaires
        let sql = 'DELETE FROM comments WHERE id = ?';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: 'Le commentaire a bien été supprimé.' });
            })
        })
    }
};

module.exports = ModerationModel;