const express = require("express");
const {
    getAllPosts,
    getPost,
    updatePost,
    deletePost,
    createPost,
} = require("../controllers/postController");

const router = express.Router();

router.route("/").post(createPost).get(getAllPosts);
router.route("/:id").patch(updatePost).delete(deletePost).get(getPost);

module.exports = router;
