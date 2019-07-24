exports.name = ['lastseen']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
	if (data.mentions.length > 0) {
		for (var i = 0; i < users.length; i++) {
			let item = users[i];
			if (item.id == data.mentions[0].id) {
				bot.sendChat(item.username + " was last seen " + moment(item.lastSeen).fromNow());
			}
		}
  } else {
    let args = data.message.split(' ');
    if (args[1]) {
      let mentionedUser = args[1].substring(1);
      for (var i = 0; i < users.length; i++) {
        let item = users[i];
        let username = item.username || '';
        if (username.toLowerCase() == mentionedUser.toLowerCase()) {
          bot.sendChat(item.username + " was last seen " + moment(item.lastSeen).fromNow());
        }
      }
    }
  }
}