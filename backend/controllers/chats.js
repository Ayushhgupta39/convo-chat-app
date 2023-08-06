const { chats } = require("../data/data")

const chatsController = (req, res) => {
    return res.send(chats);
}

module.exports = chatsController;