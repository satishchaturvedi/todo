'use strict'

const Telegram = require('telegram-node-bot');
const TodoController = require('./Controllers/todo');
const OtherwiseController = require('./Controllers/otherwiseController');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram('1029440652:AAENzwJHeKa2FFP06-6Tsij6WojtSD5atc4');
const mongoose = require('mongoose');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/todolist');
var db = mongoose.connection;

const todoCtrl = new TodoController();
tg.router.when(new TextCommand('/add', 'addCommand'), todoCtrl)
        .when(new TextCommand('/get', 'getCommand'), todoCtrl )
        .when(new TextCommand('/check', 'checkCommand'), todoCtrl )
    .otherwise(new OtherwiseController());
