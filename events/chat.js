module.exports = function(bot) {
	bot.on('chat', function(data) {
		if (data.from.id != config.users.bot.id) {
			if (data.message.charAt(0) == config.settings.trigger) {
				data.message = data.message.substr(1);
				var command = commands.find(cmd => cmd.name == data.message.split(' ')[0]);
		        if (command && command.enabled && (data.from.role >= command.permission || config.users.admins.list.includes(data.from.id))) {
		        	command.handler(data);
		        }
		        if (!command) {
		        	handleTriggers(data);
		        }
		    } else {
		    	if (trivia.running) trivia.checkAnswer(data);
			    if (scramble.running) scramble.checkAnswer(data);
		    }
	    }
	});
}