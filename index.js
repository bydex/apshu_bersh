const TelegramBot = require('node-telegram-bot-api')
const {apshuService} = require("./services/apshu.service");
const fs = require("fs");

const token = '5806644729:AAEAJTu-j1EBC9eGoSemZtiRdV6W_ME5XgY'

const bot = new TelegramBot(token, { polling: true })



bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const {username} = msg.from;

    if (msg.text.includes('апщу')) {
        bot.sendPhoto(
            chatId,
            fs.createReadStream("./assets/extra-small.jpg"),
            {
                caption: apshuService.get(username),
            }
        )
        // bot.sendMessage(chatId, apshuService.get(username))
    }
})
