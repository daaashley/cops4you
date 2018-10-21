var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

router.get("/businessregister", function(req, res){
   res.render("businessregister"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    console.log("business name")
    console.log(req.body.businessname)
    if(req.body.password!=req.body.passwordconfirm){
        req.flash("error","Passwords do not match.")
        if(req.body.businessname){
              return res.render("businessregister")
        }else{
            return res.render("register")
        }
      
    }
    console.log("register post hit")
    console.log("business name: "+req.body.businessname)
    if(req.body.businessname){
    var newUser = new User({username: req.body.username,
                            type:req.body.type,
                            email:req.body.email,
                            phone:req.body.phonenumber,
                            businessname:req.body.businessname
                            
                            });
    }else{
         var newUser = new User({username: req.body.username,
                            type:req.body.type,
                            email:req.body.email,
                            phone:req.body.phonenumber
                            
                            });
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Cops Four You " + user.username);
           if(req.body.businessname){
               console.log("has business name")
               res.redirect("/campgrounds/businessfeed"); 
           }else{
               res.redirect("/campgrounds")
           }
           
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});



module.exports = router;