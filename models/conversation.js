var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
   post:String,
    author1:String,
    author2:String,
    comments:[
            {
                author:String,
                text:String,
                date:String
                }
        ]
   
});

module.exports = mongoose.model("Conversation", commentSchema);