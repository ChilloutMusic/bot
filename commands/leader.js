exports.name = ['leader']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
  let maxPoints = 0;
  let maxUser;
  for (var i = 0; i < users.length; i++) {
    if (users[i].balance) {
      if (users[i].balance.points > maxPoints) {
        maxPoints = users[i].balance.points;
        maxUser = users[i];
      }
    }
  }
  bot.sendChat(maxUser.username + " is the current love leader with " + Math.round(maxPoints * 10 )/10 + " points! :love_letter: What a nerd!");
}