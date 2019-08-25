exports.name = ['love']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {

	if (data.mentions.length > 0) {
		for (var i = 0; i < users.length; i++) {
			var item = users[i];
			if (item.id == data.mentions[0].id) {
				item.balance.points = item.balance.points + 1;
				bot.sendChat(item.username + " received 1 love point! :love_letter: For some reason " + data.from.username + " loves " + item.username + " <3");
	
				// Award 0.15 as incentive to the love giver
				for (var i = 0; i < users.length; i++) {
					var item = users[i];
					if (item.id == data.from.id) {
						item.balance.points = item.balance.points + 0.15;
					}
				}
	
				fs.writeFileSync("./users.json", JSON.stringify(users));
				loadUsers(bot);
				break;
			}
		}
	} else {
		for (var i = 0; i < users.length; i++) {
			var item = users[i];
			if (bot.getDJ() != null && item.id == bot.getDJ().id) {
				item.balance.points = item.balance.points + 1;
				bot.sendChat(getLang("love") + " @" + bot.getDJ());
				bot.sendChat(item.username + " received 1 love point! :love_letter:");
				bot.woot();
			
				// Award 0.15 as incentive to the love giver
				for (var i = 0; i < users.length; i++) {
					var item = users[i];
					if (item.id == data.from.id) {
						item.balance.points = item.balance.points + 0.15;
					}
				}
	
				fs.writeFileSync("./users.json", JSON.stringify(users));
				loadUsers(bot);
				break;
			}
		}
	}
}