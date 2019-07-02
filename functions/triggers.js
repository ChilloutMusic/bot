module.exports = function(bot) {
	handleTriggers = function(data) {
		for (var i = 0; i < triggers.total; i++) {
    		if (triggers.triggers[i].keyword == data.message.split(' ')[0]) {
    			triggers.triggers[i].useCount += 1;
    			bot.sendChat(formatTriggers(data, triggers.triggers[i].content));
    			break;
    		}
    	}
	}
	formatTriggers = function(data, content) {
		content = content.replace(/\[me]/gi, data.from);

		content = content.replace(/\[dj]/gi, bot.getDJ());
		if (content.match(/\[you]/gi)) {
			if (data.mentions.length == 0) {
				content = content.replace(/\[you]/gi, randomUser());
			} else {
				content = content.replace(/\[you]/gi, data.mentions);
			}
		}

		if (content.match(/^\/me|^\/em/)) {
			content = content.replace('/me', '');
			content = content.replace('/em', '');
			content = content.trim();
			content = `${content}`;
		} else {
			content = content.trim();
		}

		var anyone;
		while((anyone = /\[anyone]/gi.exec(content)) !== null) {
			content = content.replace(anyone, randomUser());
		}

		let re =  /\[\((.+?)\)\]/;
		let multiChoiceTrigger = re.test(content);
		if (multiChoiceTrigger) {
			let randomSelection = re.exec(content)[1].split(',');
			let randomOutput = randomSelection[Math.floor(Math.random() * randomSelection.length)];
			content = content.replace(re, randomOutput);
		}

		return content;
	}
	addTriggers = function(data, trigger, content) {
		triggers.triggers.push({
			"keyword": trigger,
			"content": content,
			"useCount": 0,
			"creator": {
				"username": data.from.username,
				"id": (data.from.id).toString()
			},
			"dateAdded": new Date().toISOString()
		});
		triggers.total = triggers.triggers.length;
		updateTriggers();
		bot.sendChat("Added the trigger !"+trigger);
	}
	removeTriggers = function(data, trigger) {
		for (var i = 0; i < triggers.total; i++) {
    		if (triggers.triggers[i].keyword == trigger) {
    			triggers.triggers.splice(i, 1);
    			triggers.total = triggers.triggers.length;
    			updateTriggers();
    			bot.sendChat("Removed the trigger !"+trigger);
    			break;
    		}
    	}
	}
	updateTriggers = function() {
		var t = JSON.stringify(triggers);
		fs.writeFileSync('./triggers.json', t);
		loadTriggers(bot);
	}
	randomUser = function() {
		var users = bot.getUsers();
		return users[Math.floor(Math.random() * users.length)].username;
	}
}