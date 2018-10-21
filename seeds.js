var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        title: "Security needed for one night", 
        location: "Exclusive Events",
        rate:"$200 for the night",
        description: "Need security for an art exhibit on November 1st 2018."
    
    },
    {
        title: "Part Time Security Guard", 
        location: "Hype Beast Central",
        rate:"$35/hour",
        description: "New high end store, needs extra security for our grand opening on November 20th"
    },
    {
        title: "Security needed for award ceremony", 
        location: "LSP Awards",
        rate:"$250 for the night",
        description: "Our Big annual award ceremony is just a month away and we need off duty officers to secure the event."
    },
    {
        title: "Part time Security Needed", 
        location: "Diamond House",
        rate:"$33/hour", 
        description: "In Need of a part time security guard. we are willing to work with your work schedule."
    },
    {
        title: "Closing shift Security", 
        location: "Route 66 Diner",
        rate:"$25/hour",
        description: "Due to recent events, we need extra security for ourr closing shift."
    },
    {
        title: "Event Security Guard", 
        location: "Glamour events",
        rate:"$200 per event",
        description:"Security needed for upcoming events"
    },
    {
        title: "Restaurant Security",
        location: "Chef David's Kitchen",
        rate:"$25/hour",
        description:"Need Security on weekends"  
    },
    {
        title: "Celebrity Security Guard", 
        location: "Elegant Bistro",
        rate:"$350 for the night",
        description:"We're hosting a Master chef like competition and we need security to protect our celebrity judges."
    },
    {
        title: "Upscale Club Security", 
        location: "Night in paris Lounge ",
        rate:"$150 per night",
        description:"Looking for overnight security for Thursdays, Fridays, Saturdays and Sundays."
    },
    {
        title: "Casino Security Guard", 
        location: "Magical Casino ",
        rate:"$35/hour",        
        description:"we're a new casino in town and we're looking for off duty cops for our grand opening"
    }
    
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    campground.save();
                    //create a comment
                    /*
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                        */
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
