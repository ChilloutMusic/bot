exports.name = 'plays'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	console.log(history.all);
	var song = data.message.replace('plays ', '').split(/\s-\s(.+)/);
	var found = false;
	if (song.length > 1) {
		for (var historyID in history.all) {
			if (history.all[historyID].artist == song[0] && history.all[historyID].title == song[1]) {
				found = true;
				bot.sendChat('@' + data.from.username + ', That song has played ' + history.all[historyID].total.plays + ' times, It was last played ' + timeSince(new Date(history.all[historyID].latest.timestamp)));
			}
		}
		if (!found) {
			bot.sendChat('@' + data.from.username + ', I couldn\'t find that song in the history');
		}
	}
}