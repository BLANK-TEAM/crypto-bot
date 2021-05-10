import { Telegraf, Markup } from 'telegraf'
import bot from '../../telegram.js'

const MenuButtons = Markup.keyboard(
    [
        [
            'Валюты📈', 'Личный кабинет💼'
        ],
        [
            '⏳подписка⌛️', 'Помощь👨‍🔧'
        ]
        
    ]
)

export default MenuButtons