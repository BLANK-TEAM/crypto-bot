const { Telegraf, session, Scenes: { Stage }, Markup } = require('telegraf')
const bot = require('../../telegram')
const forwardButton = Markup.keyboard(['Вперед🚀']).oneTime()

const SubsciptionButtons = Markup.inlineKeyboard(
  [
    [{ text: '1 месяц🥉', callback_data: 'ONE_MONTH' }, { text: '3 месяца🥈', callback_data: 'THREE_MONTH' }],
    [{ text: 'Пол года🥇', callback_data: 'HALF_YEAR' }, { text: '1 Год💎', callback_data: 'YEAR' }]
  ])
const MakeSub = Markup.inlineKeyboard(
  [
    [{ text: 'Оформить подписку⏰', callback_data: 'MAKE_SUB' }],
    [{ text: 'Назад🔙', callback_data: 'BACK' }]

  ])

const removeForwardButton = (ctx) => {
  ctx.reply(null, Markup.removeKeyboard());
}

module.exports = {
  forwardButton, SubsciptionButtons, MakeSub, removeForwardButton
}