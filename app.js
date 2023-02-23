var mysql = require('mysql');
var con = require('./database');
var bodyParser = require("body-parser");
var express = require("express");
var eje = require('ejs')
var app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.get('/', function(req, resp) {
    resp.sendFile(__dirname + '/index.html');
});

app.post('/db', function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
    var sql = `INSERT INTO reg (name, email, password) VALUES ('${name}', '${email}', '${password}')`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect("/home")
        // res.send('Success!');
    });
});

app.get('/home', function (req, res) {
    var sql = "select * from reg";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.render('home', { project: result });
    })
})


app.get('/update_data', function (req, res) {
    let id = req.query.id
    let sql = `UPDATE from reg where id=${id}`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect("/home")
    })
})

app.get('/delete_data', function (req, res) {
    let id = req.query.id 
    console.log('fds',id)
    let sql = `DELETE from reg where id='${id}'`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        // res.redirect("/home")
    })
})


app.listen(4000, function() {
    console.log('Server started on port 4000');
});


