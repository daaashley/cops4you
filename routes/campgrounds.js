var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comments = require("../models/comment");
var Conversations = require("../models/conversation")

var middleware = require("../middleware");
var seedDB = require("../seeds");


//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    //seedDB.seedDB();
    
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           console.log("printing all campgrounds")
           console.log(allCampgrounds)
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

router.get("/messages", function(req, res){
    // Get all campgrounds from DB
    console.log("Hit the messages Route!")
      Conversations.find({author1:req.currentUser},function(err,thecomments){
                if(err){
                    console.log(err)
                }else{
                    console.log("Conversations from the /messages route")
                    console.log(thecomments)
                       res.render("campgrounds/messages",{data:thecomments,user:req.user.username});
                }
            })
    
    
});

router.post("/applyMessage",function(req,res){
    console.log("apply message route");
    console.log(req.user);
    console.log(req.body.business);
    console.log(req.body.title);
    var thetext = "Hello! I am interested in your post for " + req.body.title;
    var comment = {
        post:req.body.title,
        author1:req.user.username, //police
        author2:req.body.business, //business
        comments:[{
            text:thetext,
            author:req.user.username, //always police
            date:Date.now()         //Current timestamp
        }]
    }
    
                Conversations.create(comment,function(err){
                    if(err){
                         console.log(err);
             }else{
          
                 
    
      Conversations.find({post:req.body.title},function(err,thecomments){
                if(err){
                    console.log(err)
                }else{
                    
                       res.render("campgrounds/messages",{data:thecomments,user:req.user.username});
                }
            })
             }
                })
})

router.post("/sendMessage/:post",function(req,res){
    var comment = {
        text:req.body.message,
        author:req.user.username,
        date:Date.now()
    }
    Conversations.update({_id:req.params.post},{ $push: { comments: comment } },function(err){
        if(err){
            console.log(err);
        }else{
            console.log("comment added");
            
        }
    })
      Conversations.find({_id:req.params.post},function(err,thecomments){
                if(err){
                    console.log(err)
                }else{
                    console.log(thecomments)
                       res.render("campgrounds/messages",{data:thecomments,user:req.user.username});
                }
            })
})

router.get("/businessfeed", function(req, res){
    // Get all campgrounds from DB
    res.render("campgrounds/businessfeed");
    
    /*
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
    */
});

router.get("/profile",function(req, res) {
    res.render("campgrounds/profile");
});

router.post("/postJob",function(req,res){
    console.log("Hit the post Job route")
    var title = req.body.title;
    var location = req.body.location;
    var rate = req.body.rate;
    var description = req.body.description;
     var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newPost = {title: title, location: location, description: description,rate:rate,author:author}
    console.log("below is post data")
    console.log(newPost)
    // Create a new campground and save to DB
    Campground.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/businessfeed")
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds/businessfeed");
        }
})
})

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;

