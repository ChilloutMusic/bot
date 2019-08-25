exports.name = ['atstaff']
exports.permission = config.permissions.bouncer
exports.enabled = true
exports.handler = function(data) {
	var users = bot.getUsers();
	var staff = '';
	for (var i = 0; i < users.length; i++) {
		if (users[i].role >= config.permissions.bouncer) {
			staff += '@'+users[i].username+', ';
		}
	}
	if (staff !== '') {
		bot.sendChat(staff.slice(0, -2));
	} else {
		bot.sendChat("No staff online!");
	}
}