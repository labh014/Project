const express = require("express");
const router = express.Router();


//POSTS
router.get("/posts", (req,res) => {
    res.send("get for posts");
});

router.get("/posts/:id", (req,res) => {
    res.send("get show for posts");
});

router.post("/posts", (req,res) => {
    res.send("post for posts");
});

router.delete("/posts/:id", (req,res) => {
    res.send("delete for posts");
});

router.put("/posts/:id", (req,res) => {
    res.send("update for posts");
});

module.exports = router;

