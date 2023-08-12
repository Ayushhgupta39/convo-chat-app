const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");
const router = express.Router(); 

// router.get("/api/chats/:id", (req, res) => {
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat)
// });

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users", protect, getAllUsers);

module.exports = router;
