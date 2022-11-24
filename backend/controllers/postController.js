const Post = require("../models/post");

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: "success",
            data: {
                posts,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err,
        });
    }
};

exports.getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err,
        });
    }
};
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                updatedPost,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err,
        });
    }
};
exports.deletePost = async (req, res) => {
    const { id } = req.paramss;
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            status: "deleted",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err,
        });
    }
};
exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};
