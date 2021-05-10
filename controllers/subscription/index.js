import { Scenes, Markup } from 'telegraf'

const BaseScene = Scenes.BaseScene
const Stage = Scenes.Stage

const SubscriptionScene = new BaseScene('SUBSCRIPTION_TYPE_SCENE_ID')
import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../locales/ru.json', import.meta.url)));
// const SubscriptionStartButton = require('./helpers')


SubscriptionScene.enter((ctx)=>{
    
})

export default SubscriptionScene