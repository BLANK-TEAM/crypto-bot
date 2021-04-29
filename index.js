const { Telegraf,Scenes } = require("telegraf")
const mongoose = require("mongoose")
require('dotenv').config()
const bot = new Telegraf(process.env.Bot_token)

const Start = require(`./controllers/start/index`)

mongoose.connect("mongodb+srv://SkyDraw:24681323asd@cluster0.dgxtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('db connected'))
    .catch(err => console.error(err))
    
    mongoose.connection.on(`open`, ()=>{
        const stage = new Scenes.Stage([
            Start
        ])

        bot.use(stage.middleware())

        
    })
    
    
    
    bot.launch()