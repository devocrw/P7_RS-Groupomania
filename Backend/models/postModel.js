// Modèle de données pour toutes les actions des collaborateurs

const connectdb = require('../connectdb.js');
const mysql = require('mysql');


class PostModel {
    constructor() {
    }
    // CRÉATION DES POSTS //
    createPost(sqlInserts) {
        console.log(sqlInserts)
        let sql = 'INSERT INTO posts(userId, title, content, date , likes ) VALUES( ?, ?, ?, NOW(), 0)';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: 'Le nouveau post a bien été créé!' });
            })
        })
    };
    // MODIFICATIONS DES POSTS //
    updatePost(sqlInsert1, sqlInsert2) { // possibilité de modifier uniquement ses propres posts
        let sql_request1 = 'SELECT * FROM posts where id = ?'; // Première requête SELECT pour sélectionner le post 
        sql_request1 = mysql.format(sql_request1, sqlInsert1);
        return new Promise((resolve) => { // retourne une promesse 
            connectdb.query(sql_request1, function (err, result, fields) {  // extraction du résultat avec la méthode .query
                if (err) throw err;
                if (sqlInsert2[3] == result[0].userId) { // if condition si l'user id correspond deuxième requête
                    let sql_request2 = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND userId = ?';  // requête UPDATE pour modifier le post 
                    sql_request2 = mysql.format(sql_request2, sqlInsert2);
                    connectdb.query(sql_request2, function (err, result, fields) {  // extraction du résultat avec la méthode .query
                        if (err) throw err;
                        resolve({ message: 'Le post a bien été modifié.' });
                    })
                } else {
                    reject({ error: 'La fonction est indisponible.' });
                }
            })
        })
    };
    // SUPPRESSION DES POSTS //
    deletePost(sqlInsert1, sqlInsert2) { // possibilité de supprimer uniquement ses propres posts
        let sql_request1 = 'SELECT * FROM posts where id = ?'; // requête SELECT pour sélectionner le post à supprimer
        sql_request1 = mysql.format(sql_request1, sqlInsert1);
        return new Promise((resolve, reject) => { // retourne une promesse 
            connectdb.query(sql_request1, function (err, result, fields) { // extraction du résultat avec la méthode .query
                if (err) throw err;
                if (sqlInsert2[1] == result[0].userId) { // if condition si l'user id correspond à la deuxième requête
                    let sql_request2 = 'DELETE FROM posts WHERE id = ? AND userId = ?'; // requête DELETE pour supprimer le post 
                    sql_request2 = mysql.format(sql_request2, sqlInsert2);
                    connectdb.query(sql_request2, function (err, result, fields) { // extraction du résultat avec la méthode .query
                        if (err) throw err;
                        resolve({ message: 'Le post a bien été supprimé.' });
                    })
                } else {
                    reject({ error: 'La fonction est indisponible.' });
                }
            })
        })
    };
    // LIKER LES POSTS //
    postLike(sqlInsert1, sqlInsert2, liked) { // ajouter ou enlever un like
        let sql_request1 = 'INSERT INTO likes VALUES (NULL, ?, ?)'; // requête pour insérer un like
        sql_request1 = mysql.format(sql_request1, sqlInsert1);
        let sql_request2 = 'UPDATE posts SET likes = ? WHERE id = ?'; // requête pour modifier un like
        sql_request2 = mysql.format(sql_request2, sqlInsert2);
        let sql_request3 = 'DELETE FROM likes WHERE postId = ? AND userId = ?'; // requête pour supprimer un like
        sql_request3 = mysql.format(sql_request3, sqlInsert1);
        return new Promise((resolve) => {
            connectdb.query(sql_request2, function (err, result, fields) {
                if (err) throw err;
            });
            if (liked === false) { // si le post n'est pas déjà liké
                connectdb.query(sql_request1, function (err, result, fields) { // ajoute un like
                    if (err) throw err;
                    resolve({ message: 'Like !' })
                })
            }
            if (liked === true) { // si le post est déjà liké
                connectdb.query(sql_request3, function (err, result, fields) { // enlève le like
                    if (err) throw err;
                    resolve({ message: 'Like annulé!' })
                })
            }
        })
    };

    createComment(sqlInsert) { // créer un commentaire
        let sql_request = 'INSERT INTO comments(userId, postId, date, comContent) VALUES( ?, ?, NOW(), ?)';
        sql_request = mysql.format(sql_request, sqlInsert);
        return new Promise((resolve) => {
            connectdb.query(sql_request, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: 'Le nouveau commentaire a bien été créé !' })
            })
        })
    };

    updateComment(sqlInsert1, sqlInsert2) { // possibilité de modifier uniquement ses propres commentaires
        let sql_request1 = 'SELECT * FROM comments where id = ?'; // requête SELECT pour sélectionner le commentaire à modifier
        sql_request1 = mysql.format(sql_request1, sqlInsert1);
        return new Promise((resolve) => { // retourne une promesse 
            connectdb.query(sql_request1, function (err, result, fields) { // extraction du résultat avec la méthode .query
                if (err) throw err;
                if (sqlInsert2[2] == result[0].userId) { // if condition si l'user id correspond à la deuxième requête
                    let sql_request2 = 'UPDATE comments SET comContent = ? WHERE id = ? AND userId = ?';  // requête UPDATE pour modifier le corps du commentaire
                    sql_request2 = mysql.format(sql_request2, sqlInserts);
                    connectdb.query(sql_request2, function (err, result, fields) { // extraction du résultat avec la méthode .query
                        if (err) throw err;
                        resolve({ message: 'Le commentaire a bien été modifié.' });
                    })
                } else {
                    reject({ error: 'La fonction est indisponible.' });
                }
            })
        });
    };

    deleteComment(sqlInsert1, sqlInsert2) { // possibilité de supprimer uniquement ses propres commentaires
        let sql_request1 = 'SELECT * FROM comments where id = ?'; // requête SELECT pour sélectionner le commentaire à supprimer
        sql_request1 = mysql.format(sql_request1, sqlInsert1);
        return new Promise((resolve, reject) => { // retourne une promesse
            connectdb.query(sql_request1, function (err, result, fields) { // extraction du résultat avec la méthode .query
                if (err) throw err;
                if (sqlInsert2[1] == result[0].userId) { // if condition si l'user id correspond à la deuxième requête
                    let sql_request2 = 'DELETE FROM comments WHERE id = ? AND userId = ?'; // requête DELETE pour supprimer le commentaire
                    sql_request2 = mysql.format(sql_request2, sqlInsert2);
                    connectdb.query(sql_request2, function (err, result, fields) { // extraction du résultat avec la méthode .query
                        if (err) throw err;
                        resolve({ message: 'Le commentaire a bien été supprimé !' });
                    })
                } else {
                    reject({ error: 'La fonction est indisponible.' });
                }
            });
        })
    };

    getAllPosts() { // afficher tous les posts
        let sql_request = "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(DATE(posts.date), '%e/%m/%y') AS date, TIME(posts.date) AS time, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY date DESC";
        return new Promise((resolve) => {
            connectdb.query(sql_request, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            })
        })
    };

    getComments(sqlInsert) { // affcher tous les commentaires
        let sql = "SELECT comments.comContent, DATE_FORMAT(comments.date, '%e/%m/%y à %k:%i:%s') AS date, comments.id, comments.userId, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
            })
        })
    };


    getAllLikes() { // afficher tous les likes
        let sql = 'SELECT * FROM likes';
        return new Promise((resolve) => {
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    };

};

module.exports = PostModel;