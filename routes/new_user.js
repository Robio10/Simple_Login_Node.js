var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var sess = req.session;
    if(!sess){
        res.end('welcome to the session demo. refresh!')
    }
    var username = req.body.username;
    var password = req.body.password;
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/User_List';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            var collection = db.collection('users_details');
            collection.find({"_id": username, "password": password}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    res.render('new_user', {name : username});
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    res.redirect('/');
                }
                db.close();
            });
        }
    });

});
/* GET home page. */
module.exports = router;
