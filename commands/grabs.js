exports.name = ['grabs']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	var highest = {
		grabs: 0,
		index: 0
	}
	for (var i = 0; i < history.last24h.length; i++) {
		if (highest.grabs < history.last24h[i].grabs) {
			highest.grabs = history.last24h[i].grabs;
			highest.index = i;
		}
	}
	bot.sendChat('"' + history.last24h[highest.index].artist + ' - ' + history.last24h[highest.index].title + '" was the most grabbed song in the last 24 hours with ' + history.last24h[highest.index].grabs + ' grabs')
}