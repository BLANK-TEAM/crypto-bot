const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const { forwardButton, SubsciptionButtons, MakeSub, removeForwardButton } = require('./helpers')
const { calculateNextPayment, verifyPayment, mockPayment } = require('../../payment/helper')
const StartTypeScene = new BaseScene('START_TYPE_SCENE_ID')
const Usermodel = require('../../models/User')
const Config = require('../../locales/ru.json')
const bot = require('../../telegram')

StartTypeScene.enter((ctx) => {
    ctx.session.__scenes.state.id = ctx.update.message.from.id
    Usermodel.findOne({
        UserID: ctx.update.message.from.id
    }).then(async (doc) => {
        if (doc) return
        if (!doc) {
            const newUser = new Usermodel({
                Username: ctx.update.message.from.first_name,
                UserID: ctx.update.message.from.id
            })

            await newUser.save()
        }
    })
    ctx.reply(Config.scenes.start.welcomeMessage, forwardButton.resize(true))
})

StartTypeScene.hears('Вперед🚀', ctx => {
    ctx.reply(Config.scenes.start.SubInfo, SubsciptionButtons)
})

StartTypeScene.action('BACK', ctx => {
    ctx.deleteMessage()
    ctx.reply(Config.scenes.start.SubInfo, SubsciptionButtons)
})

StartTypeScene.action('MAKE_SUB', ctx => {
    mockPayment(ctx.session.__scenes.state.id)
    verifyPayment(ctx.session.__scenes.state.id, ctx)
    setTimeout(async () => {
        console.log('Payment is: ', ctx.session.__scenes.state.is_paid)
        if (ctx.session.__scenes.state.is_paid) {
            let nextpayment
            let date = Date.now()
            nextpayment = await calculateNextPayment(ctx.session.__scenes.state.subscription, date)
            Usermodel.findOne({ UserID: ctx.session.__scenes.state.id }).then((user) => {
                user.next_date_payment = nextpayment

                user.save((err, doc) => {
                    try {
                        console.log('Payment success, next date to pay: ', nextpayment)
                        ctx.reply(Config.scenes.start.CongrMessage)
                        setTimeout(()=>{
                            ctx.reply(Config.scenes.start.LinkMessage)
                        }, 3000)
                    } catch(e) {
                        console.error({ error: { e, err }})
                    }
                })
            })
        }
    }, 5000)
})

StartTypeScene.action(/.+/, ctx => {
    switch (ctx.match[0]) {
        case 'ONE_MONTH':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'ONE_MONTH'
            ctx.reply(Config.scenes.start.SubSet.Onemonth, MakeSub)
            break;
        case 'THREE_MONTH':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'THREE_MONTH'
            ctx.reply(Config.scenes.start.SubSet.threemonth, MakeSub)
            break;
        case 'HALF_YEAR':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'HALF_YEAR'
            ctx.reply(Config.scenes.start.SubSet.HalfYear, MakeSub)
            break;
        case 'YEAR':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'YEAR'
            ctx.reply(Config.scenes.start.SubSet.Year, MakeSub)
            break;
        default:
            break;
    }
})


module.exports = StartTypeScene