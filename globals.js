module.exports = function(options) {
	fs = require('fs');
	he = require('he');
	dpath = require('path');
	reload = require('require-reload')(require);
	request = require('request');
	moment = require('moment');

	commands = options.commands;
	triggers = options.triggers;
	users = options.users;
	history = options.history;
	config = options.config;
	bot = options.bot;
}