var PlugAPI = require('plugapi');
var config = require('./config.json');
var commands = [];
var triggers;

new PlugAPI({
    email: '',
    password: ''
}, function (err, bot) {
    if (err) {
        console.log('Error initializing PlugAPI: ' + err);
    } else {
        bot.multiLine = true;
        bot.multiLineLimit = 5;
        bot.deleteCommands = false;

        require('./globals')({bot: bot, config: config, triggers: triggers, commands: commands});
        require('./init')(commands, triggers);

        loadTriggers(bot);
        loadCommands(bot);
        loadGames(bot);
        loadEvents(bot);
        loadFunctions(bot);

        bot.connect(config.settings.room);
    }
});