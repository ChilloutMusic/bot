exports.name = ['trivia']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	trivia.start();
}