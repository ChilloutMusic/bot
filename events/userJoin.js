module.exports = function(bot) {
	bot.on('userJoin', function(data) {
		let isNewUser = true;
		for (var i = 0; i < users.length; i++) {
			var item = users[i];
			if (item.id == data.id) {
				isNewUser = false;
				break;
			}
		}

		if (isNewUser) {
			var startingCoins = 0;
			if (data.role >= config.permissions.bouncer) {
				startingCoins = 20;
			}
			let user = {
				id: data.id,
				username: data.username,
				lastSeen: new Date(),
				balance: {
					coins: startingCoins,
					points: 0
				}
			}
			users.push(user);
			fs.writeFileSync("./users.json", JSON.stringify(users));
			loadUsers(bot);
		}
	});
}