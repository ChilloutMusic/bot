exports.name = 'front'
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	if (data.mentions.length > 0) {
		bot.moderateMoveDJ(data.mentions[0].id, 1);
	}
}