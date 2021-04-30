const {Scenes:{BaseScene,Stage},Markup} = require('telegraf')
const StartTypeScene = new BaseScene('START_TYPE_SCENE_ID')
const Usermodel = require('../../models/User')
const Config = require('../../locales/ru.json')

const forwardButton = Markup.keyboard(['Вперед🚀']).oneTime()

StartTypeScene.enter((ctx)=>{
    Usermodel.findOne({
        UserID: ctx.update.message.from.id
    }).then(async(doc)=>{
        if(doc) return
        if(!doc){
            const newUser = new Usermodel({
                Username:ctx.update.message.from.first_name,
                UserID:ctx.update.message.from.id
            })
    
            await newUser.save()
        }
    })
    ctx.reply(Config.scenes.start.welcomeMessage, forwardButton.resize(true))
})

StartTypeScene.hears('Вперед🚀', ctx => {
    ctx.reply(Config.scenes.start.SubInfo)
})

module.exports = StartTypeScene