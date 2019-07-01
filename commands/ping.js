exports.name = 'ping'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	bot.sendChat("Pong!");
}