import { Telegraf, Scenes } from 'telegraf'
import session from '@telegraf/session'
import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

import bot from './telegram.js'

import StartTypeScene from './controllers/start/index.js'
import MenuTypeScene from './controllers/menu/index.js'
import HelpTypeScene from './controllers/help/index.js'
import SubscriptionTypeScene from './controllers/subscription/index.js'
import PersonalAreaTypeScene from './controllers/personal_area/index.js'

mongoose.connect("mongodb+srv://SkyDraw:24681323asd@cluster0.dgxtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
    .then(() => console.log('db connected'))
    .catch(err => console.error(err))

mongoose.connection.on(`open`, () => {
    try {
        const stage = new Scenes.Stage([
            StartTypeScene,
            MenuTypeScene,
            HelpTypeScene,
            SubscriptionTypeScene,
            PersonalAreaTypeScene
        ])

        bot.use(session())
        bot.use(stage.middleware())
        bot.start((ctx) => ctx.scene.enter('START_TYPE_SCENE_ID'))
        bot.hears('Валюты📈', (ctx) => ctx.scene.enter('STOCK_TYPE_SCENE_ID'))
        bot.hears('Личный кабинет💼', (ctx) => ctx.scene.enter('PERSONAL_AREA_TYPE_SCENE_ID'))
    } catch (e) {
        console.error(e)
    }
})

bot.launch()