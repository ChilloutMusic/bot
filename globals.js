module.exports = function(options) {
	fs = require('fs');
	he = require('he');
	dpath = require('path');
	reload = require('require-reload')(require);
	request = require('request');

	commands = options.commands;
	triggers = options.triggers;
	users = options.users;
	config = options.config;
	bot = options.bot;
}