exports.name = ['move']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	if (data.mentions.length > 0 && data.message.split(' ')[2]) {
		bot.moderateMoveDJ(data.mentions[0].id, parseInt(data.message.split(' ')[2]));
	}
}