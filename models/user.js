var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    type:String,
    email:String,
    phone:String,
    businessname:String
    
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);