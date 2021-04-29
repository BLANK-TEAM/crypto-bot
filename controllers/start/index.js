const Usermodel = require(`../../models/User`)
const bot = require(`../../telegram`)
const { ButtonOne } = require(`./helpers`)
const { Scenes } = require("telegraf")


Start.enter(async(ctx)=>{
    const UserID = ctx.update.message.from.id

    Usermodel.findOne({
        UserID
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
   await ctx.reply(``, ButtonOne())

})
module.exports = Start