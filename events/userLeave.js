module.exports = function(bot) {
	bot.on('userLeave', function(data) {
		for (var i = 0; i < users.length; i++) {
			var item = users[i];
			if (item.id == data.id) {
				item.lastSeen = new Date();
				fs.writeFileSync("./users.json", JSON.stringify(users));
				loadUsers(bot);
				break;
			}
		}
	});
}