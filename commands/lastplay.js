exports.name = 'lastplay'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var historyID = bot.getMedia().cid;
	if (bot.getMedia().format == 1) {
		historyID = 'yt' + bot.getMedia().cid;
	} else {
		historyID = 'sc' + bot.getMedia().cid;
	}
	if (history.all[historyID]) {
		bot.sendChat('@' + data.from.username + ', This song was last played ' + timeSince(new Date(history.all[historyID].latest.timestamp)))
	} else {
		bot.sendChat('@' + data.from.username + ', This song has never played');
	}
}