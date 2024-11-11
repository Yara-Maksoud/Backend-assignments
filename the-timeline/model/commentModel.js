const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default :  Date.now()
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }

});

module.exports = mongoose.model("comment", commentSchema);