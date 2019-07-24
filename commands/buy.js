exports.name = 'buy'
exports.permission = config.permissions.none
exports.enabled = true
exports.handler = function(data) {

  let buyer;
  for (var i = 0; i < users.length; i++) {
    var item = users[i];
    if (item.id == data.from.id) {
      buyer = item;
    }
  }

  let boostChoice = data.message.split(' ')[1];

  switch(boostChoice) {
    case "boost1": {
      checkBalanceAndMoveDJ(boostChoice, config.cost.boost1, 1);
      break;
    } 
    case "boost3": {
      checkBalanceAndMoveDJ(boostChoice, config.cost.boost3, 3);
      break;
    }
    case "boost7": {
      checkBalanceAndMoveDJ(boostChoice, config.cost.boost7, 7);
      break;
    } 
    case "boost15": {
      checkBalanceAndMoveDJ(boostChoice, config.cost.boost15, 15);
      break;
    }
    case "front": {
      checkBalanceAndMoveDJ(boostChoice, config.cost.front, 50);
      break;
    }
    default: { 
      bot.sendChat("You can only !buy boost1, boost3, boost7, boost15, front.");
      break;
    }
  }

  function checkBalanceAndMoveDJ(boostChoice, boostCost, moveSpots) {
    if (buyer.balance.coins >= boostCost) {
      let currentPosition = bot.getWaitListPosition(data.from.id);
      if (currentPosition > 1) {
        if (currentPosition <= moveSpots) {
          bot.moderateMoveDJ(data.from.id, 1);
          bot.sendChat("@" + data.from.username + " spent " + boostCost + " ChillCoin(s) for a wait list boost :arrow_up:");
          buyer.balance.coins = buyer.balance.coins - boostCost;
          updateUsers();
        } else {
          bot.moderateMoveDJ(data.from.id, currentPosition - moveSpots);
          bot.sendChat("@" + data.from.username + " spent " + boostCost + " ChillCoin(s) for a wait list boost :arrow_up:");
          buyer.balance.coins = buyer.balance.coins - boostCost;
          updateUsers();
        }
      } else {
        bot.sendChat("@" + data.from.username + " You need to be in the Wait List and not already first.");
      }
    } else {
      bot.sendChat("@" + data.from.username + " You do not have enough coins to buy that boost.");
    }
  }

  function updateUsers() {
    fs.writeFileSync("./users.json", JSON.stringify(users));
    loadUsers(bot);
  }
}