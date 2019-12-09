'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

class OtherwiseController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  handle($) {
      $.sendMessage('Sorry I did not understand you');
  }
}
module.exports = OtherwiseController;
