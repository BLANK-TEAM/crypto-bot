import { Scenes, Markup } from 'telegraf'
import { forwardButton, SubsciptionButtons, MakeSub } from './helpers.js'
import { calculateNextPayment, verifyPayment, mockPayment } from '../../payment/helper.js'
import Usermodel from '../../models/User.js'
import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../locales/ru.json', import.meta.url)));

const BaseScene = Scenes.BaseScene
const Stage = Scenes.Stage
const StartTypeScene = new BaseScene('START_TYPE_SCENE_ID')

StartTypeScene.enter((ctx) => {
    ctx.session.__scenes.state.id = ctx.update.message.from.id
    ctx.session.id = ctx.update.message.from.id
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
    ctx.reply(json.scenes.start.welcomeMessage, forwardButton.resize(true))
})

StartTypeScene.hears('Вперед🚀', ctx => {
    ctx.reply(json.scenes.start.SubInfo, SubsciptionButtons)
})

StartTypeScene.action('BACK', ctx => {
    ctx.deleteMessage()
    ctx.reply(json.scenes.start.SubInfo, SubsciptionButtons)
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
                        ctx.reply(json.scenes.start.CongrMessage)
                        setTimeout(()=>{
                        ctx.reply(json.scenes.start.LinkMessage)
                        },500)

                        setTimeout(()=>{
                            return ctx.scene.leave()
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
            ctx.reply(json.scenes.start.SubSet.Onemonth, MakeSub)
            break;
        case 'THREE_MONTH':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'THREE_MONTH'
            ctx.reply(json.scenes.start.SubSet.threemonth, MakeSub)
            break;
        case 'HALF_YEAR':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'HALF_YEAR'
            ctx.reply(json.scenes.start.SubSet.HalfYear, MakeSub)
            break;
        case 'YEAR':
            ctx.deleteMessage()
            ctx.session.__scenes.state.subscription = 'YEAR'
            ctx.reply(json.scenes.start.SubSet.Year, MakeSub)
            break;
        default:
            break;
    }
})
StartTypeScene.leave(ctx=>{
    ctx.reply('MENU')
    ctx.scene.enter('MENU_TYPE_SCENE_ID') 
})

export default StartTypeScene