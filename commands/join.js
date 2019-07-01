exports.name = 'join'
exports.permission = config.permissions.admin
exports.enabled = true
exports.handler = function(data) {
	if (raffle.running) {
		raffle.add(data);
	}
}