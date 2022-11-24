const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("postImage"), (req, res) => {
    
    res.send(`http://localhost:8000/${req.file.originalname}`);
});

module.exports = router;
