var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var password_1 = req.body.password_1;
    if(password == password_1){
        var mongodb = require('mongodb');
        var MongoClient = mongodb.MongoClient;
        var url = 'mongodb://localhost:27017/User_List';
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                console.log('Connection established to', url);
                var collection = db.collection('users_details');
                var user1 = {"_id": username, "password": password};
                collection.insert(user1, function (err, result) {
                    if (err) {
                        res.redirect('/sign_up');
                    } else {
                        res.redirect('/');
                    }
                    db.close();
                });
            }
        });
    }
    else{
        res.redirect('/sign_up');
    }
});
/* GET home page. */
module.exports = router;
