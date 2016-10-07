var express = require('express');
var router = express.Router();
var dbrequest = require('../thedb/queries.js');
var functions = require('../do/do.js');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.get('/', function(req, res, next) {
  res.send('main');
});

router.post('/whichUser', function(req,res,next){
  dbrequest.emailLookUp(req.body.email).then(function(data){
    res.json(data);
  });
});

router.post('/appSetUp', function(req, res, next){
  dbrequest.emailLookUp(req.body.email).then(function(data){
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    if (data.length !==0){
      console.log(data[0]);
      if (!data[0].name){
        dbrequest.appSetUp(req.body).then(function(){
          console.log("updated");
          res.send('Updated user')
        })
      } else {
        console.log("already setup");
        res.send('You Already Created a Password For This Account, Please Log In!')
      }
    } else {
      console.log("email not found");
      res.send('Email Not Found, Make Sure Software is Properly Installed in your RPI.')
    }
  })
});

router.post('/rpiSetUp', function(req, res, next){
  dbrequest.rpiSetUp(req.body).then(function(){
    res.send('user ' + req.body.email + ' created');
  });
});

router.get('/userCam/:id', function(req, res, next){
  dbrequest.getCameras(req.params.id).then(function(data){
    res.json(data.rows);
  });
});

router.post('/login', function(req,res, next){
  dbrequest.emailLookUp(req.body.email).then(function(data){
    if (data.length ==0){
      res.send("Invalid Email/Password Combination");
    } else {
      if(bcrypt.compareSync(req.body.pass,data[0].pass)){
        console.log("login verified");
        res.send('Login Verified');
      } else {
        console.log("wrong");
        res.send("Invalid Email/Password Combination");
      }
    }
  })
})

module.exports = router;
