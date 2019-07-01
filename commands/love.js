exports.name = 'love'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	bot.sendChat(config.lang.love[Math.floor(Math.random()*config.lang.love.length)] + " @" + bot.getDJ());
	bot.woot();
}