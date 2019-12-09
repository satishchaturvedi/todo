const mongoose = require('mongoose');

// todolist Schema
const todolistSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const todolist = module.exports = mongoose.model('todolist', todolistSchema);

// Get todolist
module.exports.gettodolist = (callback, limit) => {
	todolist.find(callback).limit(limit);
}

// Add todolist
module.exports.addtodolist = (todolist, callback) => {
	todolist.create(todolist, callback);
}

// Update todolist
module.exports.updatetodolist = (id, todolist, options, callback) => {
	var query = {_id: id};
	var update = {
		name: todolist.name
	}
	todolist.findOneAndUpdate(query, update, options, callback);
}


// Delete todolist
module.exports.removetodolist = (id, callback) => {
	var query = {_id: id};
	todolist.remove(query, callback);
}
