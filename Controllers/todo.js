'use strict'

const Telegram = require('telegram-node-bot');

class TodoController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    addHandler($) {
      let todo = $.message.text.split(' ').slice(1).join(' ');

      if(!todo) return $.sendMessage('Sorry,please add a todo item');

      $.getUserSession('todos')
      .then(todos =>{
        if(!Array.isArray(todos)) $.setUserSession('todos', [todo]);
        else $.setUserSession('todos', todos.concat([todo]));
        console.log(todo);
        $.sendMessage('Added New todo!');
      });
    }
    getHandler($){
      $.getUserSession('todos').then(todos =>{
        $.sendMessage(this._serializeList(todos), {parse_mode : 'Markdown'});
      });
    }
    checkHandler($){
      //if(!todo) return $.sendMessage('Sorry, check a todo item');

      let index = parseInt($.message.text.split(' ').slice(1)[0]);
      if(isNaN(index)) return $.sendMessage('Sorry you didn\'t pass a valid index.');

      $.getUserSession('todos').then(todos =>{
        if(index >= todos.length) return $.sendMessage('Sorry you didn\'t pass a valid index.');
        todos.splice(index, 1);
        $.setUserSession('todos', todos);
        $.sendMessage('Checked todo!');
      });
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
            'checkCommand': 'checkHandler'
        };
    }

    _serializeList(todoList){
      let serialized = '*Your Todos:*\n\n';
      todoList.forEach(serial);
      function serial(item, index){
        serialized += index + '-' + item + '\n';
      }
      return serialized;
    }
}
module.exports = TodoController;
