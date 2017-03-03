/**
 * Created by hesham on 26/02/17.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var multer  = require('multer');

var Student = require('../models/student');
var Portfolio    = require('../models/portfolio');

var session = require('express-session');

// init
router.use(session({secret: 'ssshhhhh'}));


var sess;



// start session for an http request - response
// this will define a session property to the request object
//session.startSession(req, res, callback);


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/statics/images/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
})
const upload = multer({ storage: storage })

router.post('/changeavatar', upload.single('avatar'), function (req, res, next) {
    var student1 = req.body.student;
    var obj =req.body;
    Student.findOne({ email: obj.email }, function (err, student){




        var updateData = {
            avatar: '/images/'+req.file.filename
        };
        Student.update({email : obj.email},updateData, function(err,affected) {

        });



        Portfolio.find({email : obj.email}, function(err, portfolios){

            if(err)
                res.send(err.message);
            else{
                Student.findOne({ email: obj.email }, function (err, student){
                    sess.student = student;
                    sess.portfolios = portfolios;
                    res.redirect('/portfolio');
                });




            }
        });

    });



});





router.post('/upload_screenshot', upload.single('img'), function(req, res, next){

    sess = req.session;



   var screen = '/images/'+req.file.filename;

    var obj =req.body;
    var portfolio = new Portfolio({title : obj.title, type : 'screenshot', email : obj.email, screenshot : screen });
    portfolio.save(function(err, portfolio){
        if(err){
            res.send(err.message)
            console.log(err);
        }
        else{



            Portfolio.find({email : obj.email}, function(err, portfolios){

                if(err)
                    res.send(err.message);
                else{

                    sess.portfolios = portfolios;
                    res.redirect('/portfolio');

                }
            });




        }
    });
});








router.post('/upload_repo', function(req, res){

    sess = req.session;




    var obj =req.body;
    var portfolio = new Portfolio({title : obj.title, type : 'github', email : obj.email, link : obj.link });
    portfolio.save(function(err, portfolio){
        if(err){
            res.send(err.message)
            console.log(err);
        }
        else{



            Portfolio.find({email : obj.email}, function(err, portfolios){

                if(err)
                    res.send(err.message);
                else{

                    sess.portfolios = portfolios;
                    res.redirect('/portfolio');

                }
            });




        }
    });
});







router.post('/upload_link', function(req, res){

    sess = req.session;




    var obj =req.body;
    var portfolio = new Portfolio({title : obj.title, type : 'link', email : obj.email, link : obj.URL });
    portfolio.save(function(err, portfolio){
        if(err){
            res.send(err.message)
            console.log(err);
        }
        else{



            Portfolio.find({email : obj.email}, function(err, portfolios){

                if(err)
                    res.send(err.message);
                else{

                    sess.portfolios = portfolios;
                    res.redirect('/portfolio');

                }
            });




        }
    });
});





router.get('/home', function(req, res, next){
    sess = req.session;


    Student.find({major : 'met' | 'bi'}, function(err, students){

        if(err)
            res.send(err.message);
        else{
            sess.profiles;
            sess.profiles = students;

        }
        res.render('home.html', { profiles : sess.profiles});
    });



});







router.get('/logout', function(req, res, next){
    sess = req.session;
    sess.destroy();

    Student.find({major : 'met' | 'bi'}, function(err, students){

        if(err)
            res.send(err.message);
        else{
            sess.profiles;
            sess.profiles = students;

        }
        res.render('index.html',{ profiles : sess.profiles});

    });



});




router.get('/', function(req, res, next){
    sess = req.session;
    sess.destroy();


        Student.find({major : 'met' | 'bi'}, function(err, students){

            if(err)
                res.send(err.message);
            else{
                sess.profiles;
                sess.profiles = students;

            }
            res.render('index.html',{ profiles : sess.profiles});

        });


});

router.get('/login_fail', function(req, res, next){
    res.render('login_fail.html');
});

router.get('/portfolio', function(req, res, next){
    sess = req.session;
    if(sess.student)    {

        Student.findOne({ email: sess.student.email }, function (err, student){
            res.render('portfolio.html',{student : student, portfolios : sess.portfolios});
        });


    }
    else{

        res.redirect('/');
    }

});

router.get('/login', function(req, res, next){
    res.render('login.html');
});

router.get('/register', function(req, res, next){
    res.render('register.html');
});

router.post('/register', function(req, res){
    var student1 = new Student(req.body);



    Student.find({$or:[{email : student1.email}, {username : student1.username} ]}, function(err, foundstudents){

        if(foundstudents.length==0){
            student1.save(function(err, student1){
                if(err){
                    res.send(err.message)
                    console.log(err);

                }
                else{

                    res.redirect('/login');
                }
            });

        }

        else{

            console.log(foundstudents);
            res.render('register_fail.html');



        }
    });








});






router.get('/portfolios', function(req, res, next){

    sess = req.session;



    Student.find({major : 'met' || 'bi'}, function(err, students){

        if(err)
            res.send(err.message);
        else{
            sess.profiles;
            sess.profiles = students;

        }

        if(sess.student){
            res.render('portfolios.html',{ profiles : sess.profiles});
        }
        else{
            res.render('portfolios_.html',{ profiles : sess.profiles});
        }



    });


});





router.get('/portfolio_', function(req, res, next){

sess=req.session;
var email2 = req.query.email;

Student.findOne({email : email2}, function(err, student2){



    Portfolio.find({email : email2}, function(err, portfolios2){


        if(sess.student){
            res.render('portfolio_.html', {student : student2, portfolios : portfolios2});
        }
        else{
            res.render('portfolio__.html', {student : student2, portfolios : portfolios2});
        }

    });

});

});






router.post('/login', function(req, res){
    var student1 = req.body;
    Student.findOne({email : student1.email, password : student1.password}, function(err, foundStudent){

            if(!foundStudent){
                res.redirect('login_fail');
            }
            else{
                sess = req.session;
                sess.student;
                sess.student = foundStudent;


                Portfolio.find({email : student1.email}, function(err, portfolios){

                    if(err)
                        res.send(err.message);
                    else{
                        sess.portfolios;
                        sess.portfolios = portfolios;


                        Student.findOne({email : student1.email, password : student1.password, major: 'client'}, function(err, foundStudent) {
                            if(! foundStudent){

                                res.redirect('/portfolio');
                            }
                            else{
                                res.redirect('/portfolios');
                            }

                        });



                    }
                });


            }
    });

});





module.exports = router;
