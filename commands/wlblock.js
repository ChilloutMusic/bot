exports.name = ['wlblock']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	if (data.mentions.length > 0) {
		bot.moderateWaitListBan(data.mentions[0].id, 1, 'f');
	}
}