exports.name = ['scramble']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	scramble.start();
}