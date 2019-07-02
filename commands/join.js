exports.name = 'join'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	if (raffle.running) {
		raffle.add(data);
	}
}