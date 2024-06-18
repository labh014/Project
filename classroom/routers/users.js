const express = require("express");
const router = express.Router();



//USERS
router.get("/", (req,res) => {
    res.send("get for users");
});

router.get("/:id", (req,res) => {
    res.send("get show for users");
});

router.post("/", (req,res) => {
    res.send("post for users");
});

router.delete("/:id", (req,res) => {
    res.send("delete for users");
});

// router.put("/users/:id", (req,res) => {
//     res.send("update for users");
// });

module.exports = router;
