exports.name = ['balance', 'bal']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {
  if (data.mentions.length > 0) {
    for (var i = 0; i < users.length; i++) {
      var item = users[i];
      if (item.id == data.mentions[0].id) {
        bot.sendChat(item.username + " balance is:");
        bot.sendChat(item.balance.coins + " ChillCoins :moneybag:");
        bot.sendChat(Math.round(item.balance.points * 100) / 100 + " love points :love_letter:");
      }
    }
  } else {
    for (var i = 0; i < users.length; i++) {
      var item = users[i];
      if (item.id == data.from.id) {
        bot.sendChat("@" + data.from.username + " your current balance is:");
        bot.sendChat(item.balance.coins + " ChillCoins :moneybag:");
        bot.sendChat(Math.round(item.balance.points * 100) / 100 + " love points :love_letter:");
      }
    }
  }
}