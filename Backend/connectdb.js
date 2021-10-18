const mysql = require('mysql');
console.log('Connexion à la base de données...');
let connectdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Seocrgroupdbphdzhkqsh587452lfdodsk!f:kjsdmlkgjksdlg!jdrfl!kmfqspmkdpq',
    database: 'groupomania',
});
console.log(process.env.DATABASE);
connectdb.connect(function (err) {
    if (err) throw err;


    var tableUsers = ('CREATE TABLE IF NOT EXISTS users (id INT(100) NOT NULL AUTO_INCREMENT, firstname TINYTEXT,lastname TINYTEXT,email VARCHAR(40),password VARCHAR(255),moderation INT, PRIMARY KEY(id))');
    connectdb.query(tableUsers, function (err) {
        if (err) {
            console.log('error in creating tables', err);
            return;
        }

        console.log('created a new table');
    });

    var tablePosts = ('CREATE TABLE IF NOT EXISTS posts (id INT(100) NOT NULL AUTO_INCREMENT, userId TINYTEXT, title TINYTEXT, content VARCHAR(255), date DATETIME ,likes INT, PRIMARY KEY(id))');
    connectdb.query(tablePosts, function (err) {
        if (err) {
            console.log('error in creating tables', err);
            return;
        }

        console.log('created a new table');
    });

    var tableComments = ('CREATE TABLE IF NOT EXISTS comments (id INT(100) NOT NULL AUTO_INCREMENT,comContent VARCHAR(255), date datetime, userId VARCHAR(50),postId VARCHAR(50), PRIMARY KEY(id))');
    connectdb.query(tableComments, function (err) {
        if (err) {
            console.log('error in creating tables', err);
            return;
        }

        console.log('created a new table');
    });

    var tableLikes = ('CREATE TABLE IF NOT EXISTS likes (id INT(100) NOT NULL AUTO_INCREMENT, userId VARCHAR(50),postId VARCHAR(50), PRIMARY KEY(id))');
    connectdb.query(tableLikes, function (err) {
        if (err) {
            console.log('error in creating tables', err);
            return;
        }

        console.log('created a new table');
    });
    console.log('Connecté à Groupomania !')
});

module.exports = connectdb;

