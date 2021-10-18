// Modèle de données pour tous les users

const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserModel {
    constructor() {
    }

    signup(sqlInsert) {
        let sql = 'INSERT INTO users(firstname, lastname, email, password , moderation) VALUES( ?, ?, ?, ?, 0)';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function (err, result) {
                console.log(err);
                if (err) reject({ error: 'Erreur dans l\'inscription' });
                resolve({ message: 'Nouvel utilisateur !' })
            })
        })
    }

    login(sqlInsert, password) {
        let sql = 'SELECT * FROM users WHERE email = ?';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function (err, result) {
                if (err) reject({ err });
                if (!result[0]) {
                    reject({ error: 'L\'utilisateur est introuvable dans la base de données.' });
                } else { // else si le mail a une correspondance dans la base alors: 
                    bcrypt.compare(password, result[0].password) // bcrypt compare le mot de passe 
                        .then(valid => {
                            if (!valid) return reject({ error: 'Mot de passe incorrect !' }); // Si le mdp n'est pas valide error 
                            resolve({ // Si tout est ok : génération du token 
                                userId: result[0].id,
                                moderation: result[0].moderation,
                                token: jwt.sign(
                                    {
                                        userId: result[0].id,
                                        moderation: result[0].moderation
                                    },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })
        })
    };

    displayProfile(sqlInsert) {
        let sql = 'SELECT firstName, lastName, email FROM users WHERE id = ?';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function (err, result) {
                if (err) return reject({ error: 'La page est indisponible' });
                resolve(result);
            })
        })
    };

    updateProfile(sqlInsert) {
        let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function (err, result) {
                if (err) return reject({ error: 'La fonction est indisponible' });
                resolve({ message: 'Les informations ont bien été mises à jour!' });
            })

        })
    };

    deleteUser(sqlInsert) {
        let sql = 'DELETE FROM users WHERE id = ?';
        sql = mysql.format(sql, sqlInsert);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function (err, result) {
                if (err) return reject({ error: 'La fonction est indisponible' });
                resolve({ message: 'Utilisateur supprimé' });
            })

        })

    }
};

module.exports = UserModel;