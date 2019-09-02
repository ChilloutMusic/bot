exports.name = ['tip']
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {

  let tipper;
  for (var i = 0; i < users.length; i++) {
    var item = users[i];
    if (item.id == data.from.id) {
      tipper = item;
    }
  }

	if (data.mentions.length > 0) {
    let args = data.message.split(' ');
    let tipAmount = parseInt(args[1]);
    let mentionedUser = data.mentions[0];
    let isReceiverStaff = false;
    let hasEnoughCoins = false;

    // Award tip amount to a mentioned user
		for (var i = 0; i < users.length; i++) {
			var item = users[i];
			if (item.id == mentionedUser.id && Number.isInteger(tipAmount)) {
        if (mentionedUser.role >= config.permissions.bouncer) {
          isReceiverStaff = true;
        }

        if (isReceiverStaff && Math.sign(tipAmount) == 1) {
          if (tipper.balance.coins >= tipAmount) {
            item.balance.coins = item.balance.coins + tipAmount;
            bot.sendChat(item.username + " now has " + item.balance.coins + " ChillCoins(s)! :moneybag:");
            hasEnoughCoins = true;
          } else {
            bot.sendChat("You wish! You don't have enough coins to tip :crying_cat_face:");
          }
        }

        if (!isReceiverStaff && Math.sign(tipAmount) == 1) {
          item.balance.coins = item.balance.coins + tipAmount;
          bot.sendChat(item.username + " now has " + item.balance.coins + " ChillCoins(s)! :moneybag:");
        }
	
				fs.writeFileSync("./users.json", JSON.stringify(users));
				loadUsers(bot);
				break;
			}
    }

    // Take away from wallet if the receiver is staff
    if (isReceiverStaff) {
      for (var i = 0; i < users.length; i++) {
        var item = users[i];
        if (item.id == data.from.id && Number.isInteger(tipAmount) && hasEnoughCoins && Math.sign(tipAmount) == 1) {
          item.balance.coins = item.balance.coins - tipAmount;

          fs.writeFileSync("./users.json", JSON.stringify(users));
          loadUsers(bot);
          break;
        }
      }
    }
	} else {
    // Award tip to current DJ
    if (bot.getDJ() && tipper.id != bot.getDJ().id) {
      if (data.from.role <= 1000 && tipper.balance.coins >= 1) {
        tipper.balance.coins = tipper.balance.coins - 1;
        tipDJ();
      } else if (data.from.role >= config.permissions.bouncer) {
        tipDJ();
      } else {
        bot.sendChat("You wish! You don't have enough coins to tip :crying_cat_face:");
      }
    } else {
      bot.sendChat("You can't tip yourself!");
    }
  }
  
  function tipDJ() {
    for (var i = 0; i < users.length; i++) {
      var item = users[i];
      if (bot.getDJ() != null && item.id == bot.getDJ().id) {
        item.balance.coins = item.balance.coins + 1;
        bot.sendChat(item.username + " received 1 ChillCoin for their amazing play! :moneybag:");
        bot.woot();

        updateUsers();
        break;
      }
    }
  }

  function updateUsers() {
    fs.writeFileSync("./users.json", JSON.stringify(users));
    loadUsers(bot);
  }
}