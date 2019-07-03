exports.name = 'love'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	bot.sendChat(getLang("love") + " @" + bot.getDJ());
	bot.woot();
}