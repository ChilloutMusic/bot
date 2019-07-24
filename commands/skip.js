exports.name = ['skip']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	var arg = data.message.split(' ')[1];
	var dj = bot.getDJ();
	bot.moderateForceSkip();
	if (arg == 'op') {
		setTimeout(function() {
			bot.moderateMoveDJ(dj.id, 2);
		}, 1000);
		bot.sendChat("@" + dj.username + ", Your song was overplayed, Please choose a differnet one.");
	} else if (arg == 'retry') {
		setTimeout(function() {
			bot.moderateMoveDJ(dj.id, 2);
		}, 1000);
		bot.sendChat("@" + dj.username + ", Your song was unavailable, Please choose a differnet one.");
	}
}