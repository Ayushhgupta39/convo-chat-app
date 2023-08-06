const express = require("express");
const chatsController = require("../controllers/chats");
const { chats } = require("../data/data");
const router = express.Router();

router.get("/api/chats", chatsController);

router.get("/api/chats/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat)
});

module.exports = router;
