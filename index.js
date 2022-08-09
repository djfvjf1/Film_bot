const TelegramApi = require('node-telegram-bot-api')

const token = '5431940847:AAHFjBu47Jyi30JHBmcteb0lAkdbmyMbdhI'

const {gameOptions, againOptions} = require('./options')

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
            bot.sendMessage(chatId, 'Я загадываю цифру от 0 до 9, тебе нужно ее отгадать')
            const randomValue = Math.floor(Math.random() * 10)
            chats[chatId] = randomValue
            bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () =>{

    bot.on('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        bot.setMyCommands([
            {command: '/start', description: 'Приветствие'},
            {command: '/info', description: 'Получить информацию о пользователе'},
            {command: '/game', description: 'Тебе нужно отгадать число'},
        ])
    
        if(text === '/start'){
            return bot.sendMessage(chatId, 'Welcome to the telegram bot, which will send you films if you write the number from Tik Tok video')
        }
        if(text === '/info'){
            return bot.sendMessage(chatId, `Your nickname is ${msg.from.first_name} `)
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'I don`t get it')
    
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if(data === '/again'){
            return startGame(chatId)
        }

        if (data === chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]} !`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот задал цифру ${chats[chatId]} !`, againOptions)
        }


    })

}

start()

