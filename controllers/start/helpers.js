import { Telegraf, Markup } from 'telegraf'
import bot from '../../telegram.js'

export const forwardButton = Markup.keyboard(['Вперед🚀']).oneTime()

export const SubsciptionButtons = Markup.inlineKeyboard(
  [
    [{ text: '1 месяц🥉', callback_data: 'ONE_MONTH' }, { text: '3 месяца🥈', callback_data: 'THREE_MONTH' }],
    [{ text: 'Пол года🥇', callback_data: 'HALF_YEAR' }, { text: '1 Год💎', callback_data: 'YEAR' }]
  ])
export const MakeSub = Markup.inlineKeyboard(
  [
    [{ text: 'Оформить подписку⏰', callback_data: 'MAKE_SUB' }],
    [{ text: 'Назад🔙', callback_data: 'BACK' }]

  ])

export const removeForwardButton = (ctx) => {
  ctx.reply(null, Markup.removeKeyboard());
}