module.exports = function(bot) {
	randomUser = function() {
		var users = bot.getUsers();
		return users[Math.floor(Math.random() * users.length)].username;
	}
}