module.exports = function(bot) {
	var disabled = false;
	bot.on('chat', function(data) {
		if (data.from.id != config.users.bot.id) {
			if (data.message.charAt(0) == config.settings.trigger) {
				data.message = data.message.substr(1);
				var command = commands.find(cmd => {
					var found = false;
					for (i = 0; i < cmd.name.length; i++) {
						if (!found) found = (cmd.name[i] == data.message.toLowerCase().split(' ')[0]);
					}
					return found;
				});
        if (!disabled && command && command.enabled && (data.from.role >= command.permission || config.users.admins.list.includes(data.from.id))) {
        	command.handler(data);
        }
        if (!disabled && !command) {
        	handleTriggers(data);
        }
        if (data.mentions.length > 0 && config.users.admins.list.includes(data.from.id)) {
      		if (data.mentions[0].username == bot.getSelf().username) {
      			if (data.message.split(' ')[0] == 'enable') {
      				disabled = false;
      				bot.sendChat("I've enabled commands");
      			} else if (data.message.split(' ')[0] == 'disable') {
      				disabled = true;
      				bot.sendChat("I've disabled commands");
      			}
      		}
        }
	    } else {
	    	if (!disabled && trivia.running) trivia.checkAnswer(data);
		    if (!disabled && scramble.running) scramble.checkAnswer(data);
	    }
    }
	});
}