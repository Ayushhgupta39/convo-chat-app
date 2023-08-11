const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");
const router = express.Router(); 

// router.get("/api/chats/:id", (req, res) => {
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat)
// });

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
