const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const uploadRouter = require("./routes/upload");

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use("/api/uploads", uploadRouter);
app.use(express.static("uploads"));

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

mongoose.connect(process.env.DB).then((connection) => {
    console.log("connected to db");
});

app.listen(process.env.PORT, () => {
    console.log("server is up and running");
});
