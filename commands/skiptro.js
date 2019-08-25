exports.name = ['skiptro']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	if ((bot.getDJ() !== null && bot.getDJ().id == data.from.id) || data.from.role > config.permissions.bouncer) {
		bot.moderateForceSkip();
	}
}