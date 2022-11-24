const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

postSchema.pre(/^find/, function (next) {
    this.populate({ path: "user" });
    next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
