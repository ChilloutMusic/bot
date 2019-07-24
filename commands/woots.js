exports.name = ['woots']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var highest = {
		woots: 0,
		index: 0
	}
	for (var i = 0; i < history.last24h.length; i++) {
		if (highest.woots < history.last24h[i].woots) {
			highest.woots = history.last24h[i].woots;
			highest.index = i;
		}
	}
	bot.sendChat('"' + history.last24h[highest.index].artist + ' - ' + history.last24h[highest.index].title + '" was the most wooted song in the last 24 hours with ' + history.last24h[highest.index].woots + ' woots')
}