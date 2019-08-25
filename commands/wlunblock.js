exports.name = ['wlunblock']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	console.log('wlblock');
	if (data.mentions.length > 0) {
		bot.moderateWaitListUnbanUser(data.mentions[0].id);
	}
}