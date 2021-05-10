import { Scenes, Markup } from 'telegraf'
import MenuButtons from './helpers.js'

import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../locales/ru.json', import.meta.url)));

const BaseScene = Scenes.BaseScene
const Stage = Scenes.Stage

const MenuScene = new BaseScene('MENU_TYPE_SCENE_ID')

MenuScene.enter((ctx)=>{
    ctx.reply(json.scenes.menu.FAQ, MenuButtons.resize(true))
})
MenuScene.hears('Личный кабинет💼',(ctx)=>{
    ctx.scene.leave()
    ctx.scene.enter('PERSONAL_AREA_TYPE_SCENE_ID')
})


export default MenuScene