const { Telegraf,Murkup,Extra } = require("telegraf")
const { keyboard } = require("telegraf/typings/markup")

function ButtonOne(){
    return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      [
        m.callbackButton('Вперед🚀', JSON.stringify({ a: 'move_forward' }), false),
      ],
      {}
    )
  );
}
module.exports = { ButtonOne }