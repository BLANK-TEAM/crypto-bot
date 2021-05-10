import { Scenes, Markup } from 'telegraf'

import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../locales/ru.json', import.meta.url)));
import Usermodel from '../../models/User.js'

const BaseScene = Scenes.BaseScene
const Stage = Scenes.Stage

const PersonalAreaScene = new BaseScene('PERSONAL_AREA_TYPE_SCENE_ID')

PersonalAreaScene.enter((ctx)=>{
    Usermodel.findOne({
        UserID: ctx.session.id
    }).then(async (doc) => {
        if (!doc) return;
        ctx.reply(`Добро пожаловать в личный кабинет❗️\n ${doc.Username}\n Баланс: ${doc.Balance}\n Реферальный процент: ${doc.RefProc}\n Пользователей приведено: ${doc.Refs}\n Реферальная ссылка: *ссылка*`)
    })
})

export default PersonalAreaScene