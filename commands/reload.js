exports.name = 'r'
exports.permission = config.permissions.admin
exports.enabled = true
exports.handler = function(data) {
	var arg = data.message.split(' ')[1];
	if (arg == 'all' || arg == 'a') {
		loadTriggers(bot);
		loadCommands(bot);
		loadGames(bot);
		loadEvents(bot);
		loadFunctions(bot);
		bot.sendChat('Reloading all modules', 2);
	} else if (arg == 'commands' || arg == 'c') {
		loadCommands(bot);
		bot.sendChat('Reloading commands', 2);
	} else if (arg == 'games' || arg == 'g') {
		clearTimeout(trivia.timeout);
		clearTimeout(raffle.timeout);
		clearInterval(raffle.interval);
		loadGames(bot);
		bot.sendChat('Reloading games', 2);
	} else if (arg == 'events' || arg == 'e') {
		loadEvents(bot);
		bot.sendChat('Reloading events', 2);
	} else if (arg == 'triggers' || arg == 't') {
		loadTriggers(bot);
		bot.sendChat('Reloading triggers', 2);
	} else if (arg == 'functions' || arg == 'f') {
		loadFunctions(bot);
		bot.sendChat('Reloading functions', 2);
	}
	bot.moderateDeleteChat(data.id)
}