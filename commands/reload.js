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
		bot.sendChat('Reloading all modules');
	} else if (arg == 'commands' || arg == 'c') {
		loadCommands(bot);
		bot.sendChat('Reloading commands');
	} else if (arg == 'games' || arg == 'g') {
		clearTimeout(trivia.timeout);
		clearTimeout(raffle.timeout);
		clearInterval(raffle.interval);
		loadGames(bot);
		bot.sendChat('Reloading games');
	} else if (arg == 'events' || arg == 'e') {
		loadEvents(bot);
		bot.sendChat('Reloading events');
	} else if (arg == 'triggers' || arg == 't') {
		loadTriggers(bot);
		bot.sendChat('Reloading triggers');
	} else if (arg == 'functions' || arg == 'f') {
		loadFunctions(bot);
		bot.sendChat('Reloading functions');
	}
}