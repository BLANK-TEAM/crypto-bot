import { Scenes, Markup } from 'telegraf'
import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../locales/ru.json', import.meta.url)));

const BaseScene = Scenes.BaseScene

const HelpScene = new BaseScene('HELP_TYPE_SCENE_ID')

HelpScene.enter((ctx)=>{
    
})

export default HelpScene