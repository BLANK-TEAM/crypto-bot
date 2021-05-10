const { Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const StockScene = new BaseScene ('STOCK_TYPE_SCENE_ID')
import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../locales/ru.json', import.meta.url)));


StockScene.enter((ctx)=>{
    ctx.reply(json.scenes.stock.infostock)
})

export default StockScene