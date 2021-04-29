const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.Bot_token)
module.exports = bot